# Base de données UNIS (Supabase)

La base enregistre :

| Table | Contenu | Qui peut lire |
| --- | --- | --- |
| `auth.users` (Supabase) | Comptes : email, mot de passe chiffré, confirmation | Supabase uniquement |
| `profiles` | 1 ligne par compte : prénom, langue, coupe, taille, newsletter (avec date), acceptation des CGV | La personne elle-même |
| `club_stamps` | Tampons du Club de Bo (saison, année) | La personne elle-même |
| `waitlist` | Liste d'attente : email, langue, coupe, date du consentement | Administrateur uniquement |
| `contact_messages` | Messages de la page Contact, avec un statut (nouveau, en cours, traité) | Administrateur uniquement |
| `cookie_consents` | Preuve des choix de cookies (identifiant aléatoire, choix, date, version) | Administrateur uniquement |

La sécurité repose sur les règles **RLS** de [schema.sql](schema.sql) : le site public peut seulement créer un compte, lire et modifier son propre profil, et ajouter des lignes dans les trois autres tables, sans jamais les relire.

## Mise en place (une seule fois)

1. Crée un compte sur [supabase.com](https://supabase.com) (bouton *Continue with GitHub*).
2. **New project** : nom `unis`, région **Central EU (Frankfurt)** pour garder les données dans l'UE, plan **Free**. Clique sur *Generate a password* et garde ce mot de passe pour toi : le site n'en a pas besoin.
3. **SQL Editor > New query** : colle tout le contenu de `schema.sql`, puis **Run**.
4. **Authentication > URL Configuration** : *Site URL* = `https://unis-demo.onrender.com`, et ajoute `https://unis-demo.onrender.com/**` dans *Redirect URLs* (liens de confirmation et de mot de passe oublié).
5. **Project Settings > API** : copie *Project URL* et la clé **anon public** dans `src/config.mjs` (`supabaseUrl`, `supabaseAnonKey`), puis lance `node src/build.mjs` et pousse. **Ne copie jamais la clé `service_role`.**

## Consulter les données

**Table Editor** dans Supabase : comptes (`profiles`), liste d'attente, messages de contact, consentements. Export CSV possible pour l'outil d'emailing.

## À savoir (plan gratuit)

- Le projet se met **en pause après 7 jours sans activité** : il se relance d'un clic dans le tableau de bord (penser à le relancer avant une démo ou un oral).
- Les emails de confirmation envoyés par Supabase sont limités à quelques-uns par heure : suffisant pour une démo, pas pour un lancement (brancher alors un SMTP, par ex. Brevo).
