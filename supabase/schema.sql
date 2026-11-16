-- UNIS : schéma de la base Supabase (PostgreSQL).
-- À exécuter une fois dans Supabase > SQL Editor > New query > Run.
-- Le script peut être relancé sans erreur (il recrée les politiques et les fonctions).
--
-- Sécurité : Row Level Security (RLS) activée sur toutes les tables.
-- La clé publique "anon" du site peut seulement :
--   - créer un compte (géré par Supabase Auth, mots de passe chiffrés) ;
--   - lire et modifier SON profil et SES tampons ;
--   - ajouter une ligne dans waitlist, contact_messages, cookie_consents (jamais les lire).
-- Les données se consultent dans Supabase > Table Editor (compte administrateur).

-- ---------- Profils (1 ligne par compte créé) ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  first_name text check (char_length(first_name) <= 80),
  lang text not null default 'fr' check (lang in ('fr', 'nl', 'en', 'de')),
  cut_pref text check (cut_pref in ('flat', 'pouch')),
  size_pref text check (size_pref in ('XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL')),
  newsletter_optin boolean not null default false,
  newsletter_optin_at timestamptz,
  terms_accepted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Crée le profil automatiquement à l'inscription, à partir des données envoyées par le formulaire.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, first_name, lang, cut_pref, newsletter_optin, newsletter_optin_at)
  values (
    new.id,
    new.email,
    left(new.raw_user_meta_data ->> 'first_name', 80),
    coalesce(nullif(new.raw_user_meta_data ->> 'lang', ''), 'fr'),
    nullif(new.raw_user_meta_data ->> 'cut_pref', ''),
    coalesce((new.raw_user_meta_data ->> 'newsletter_optin')::boolean, false),
    case when coalesce((new.raw_user_meta_data ->> 'newsletter_optin')::boolean, false) then now() end
  );
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Garde updated_at et la date d'opt-in à jour.
create or replace function public.touch_profile()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  new.email := old.email;               -- l'email se change via Supabase Auth, pas ici
  new.terms_accepted_at := old.terms_accepted_at;
  if new.newsletter_optin and not old.newsletter_optin then new.newsletter_optin_at := now(); end if;
  if not new.newsletter_optin then new.newsletter_optin_at := null; end if;
  return new;
end $$;
drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_profile();

alter table public.profiles enable row level security;
drop policy if exists "profil : lire le sien" on public.profiles;
create policy "profil : lire le sien" on public.profiles for select to authenticated using (id = auth.uid());
drop policy if exists "profil : modifier le sien" on public.profiles;
create policy "profil : modifier le sien" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- ---------- Club de Bo : tampons (1 par saison et par année) ----------
create table if not exists public.club_stamps (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  season text not null check (season in ('valentin', 'printemps', 'pride', 'ete', 'halloween', 'noel')),
  year int not null check (year between 2026 and 2100),
  source text not null default 'demo' check (source in ('demo', 'order')),
  created_at timestamptz not null default now(),
  unique (user_id, season, year)
);
alter table public.club_stamps enable row level security;
drop policy if exists "tampons : lire les siens" on public.club_stamps;
create policy "tampons : lire les siens" on public.club_stamps for select to authenticated using (user_id = auth.uid());

-- Démo : la « commande » factice du site donne le tampon de la saison en cours.
-- En production, les tampons viendront des vraies commandes (source = 'order'), insérées côté serveur.
create or replace function public.claim_demo_stamp(p_season text, p_year int)
returns void language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  insert into public.club_stamps (user_id, season, year, source)
  values (auth.uid(), p_season, p_year, 'demo')
  on conflict (user_id, season, year) do nothing;
end $$;
revoke all on function public.claim_demo_stamp(text, int) from public, anon;
grant execute on function public.claim_demo_stamp(text, int) to authenticated;

-- Droit à l'effacement (RGPD) : la personne connectée supprime son compte et toutes ses données.
create or replace function public.delete_my_account()
returns void language plpgsql security definer set search_path = public, auth as $$
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  delete from auth.users where id = auth.uid();   -- cascade : profil et tampons
end $$;
revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;

-- ---------- Liste d'attente ----------
create table if not exists public.waitlist (
  id bigint generated always as identity primary key,
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 254),
  lang text not null default 'fr' check (lang in ('fr', 'nl', 'en', 'de')),
  cut_pref text check (cut_pref in ('flat', 'pouch')),
  page text check (char_length(page) <= 120),
  consent_at timestamptz not null default now(),
  confirmed boolean not null default false,   -- passera à true après le double opt-in (outil emailing)
  created_at timestamptz not null default now()
);
create unique index if not exists waitlist_email_unique on public.waitlist (lower(email));
alter table public.waitlist enable row level security;
drop policy if exists "liste d'attente : inscription" on public.waitlist;
create policy "liste d'attente : inscription" on public.waitlist for insert to anon, authenticated with check (confirmed = false);

-- ---------- Messages de contact ----------
create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 80),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 254),
  subject text check (char_length(subject) <= 80),
  order_ref text check (char_length(order_ref) <= 40),
  message text not null check (char_length(message) between 1 and 4000),
  lang text not null default 'fr' check (lang in ('fr', 'nl', 'en', 'de')),
  status text not null default 'nouveau' check (status in ('nouveau', 'en cours', 'traité')),
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
drop policy if exists "contact : envoi" on public.contact_messages;
create policy "contact : envoi" on public.contact_messages for insert to anon, authenticated with check (status = 'nouveau');

-- ---------- Preuve des consentements cookies ----------
create table if not exists public.cookie_consents (
  id bigint generated always as identity primary key,
  consent_id uuid not null,                   -- identifiant aléatoire gardé dans le cookie unis_consent
  necessary boolean not null default true check (necessary),
  analytics boolean not null,
  marketing boolean not null,
  action text not null check (action in ('accept_all', 'reject_all', 'custom')),
  policy_version text not null check (char_length(policy_version) <= 20),
  lang text check (lang in ('fr', 'nl', 'en', 'de')),
  created_at timestamptz not null default now()
);
create index if not exists cookie_consents_consent_id on public.cookie_consents (consent_id);
alter table public.cookie_consents enable row level security;
drop policy if exists "cookies : enregistrer un choix" on public.cookie_consents;
create policy "cookies : enregistrer un choix" on public.cookie_consents for insert to anon, authenticated with check (true);

-- Droits de base (Supabase les donne déjà ; rappel explicite).
grant insert on public.waitlist, public.contact_messages, public.cookie_consents to anon, authenticated;
grant select, update on public.profiles to authenticated;
grant select on public.club_stamps to authenticated;
