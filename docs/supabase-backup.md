# dsp-mastery database backups

Workflow: `.github/workflows/supabase-backup.yml` runs every night at 02:17 Karachi time
(and on demand from Actions → "Supabase nightly backup" → Run workflow).

Each run produces an encrypted artifact `dsp-mastery-YYYY-MM-DD` (kept 30 days) containing
`roles.sql`, `schema.sql`, `data.sql` (includes auth users) and `TAKEN_AT_UTC.txt`.
If a run fails, GitHub emails the repo owner.

## Secrets

| Secret | Value |
| --- | --- |
| `SUPABASE_DB_URL` | Supabase dashboard → dsp-mastery → Connect → **Session pooler** string, with the DB password filled in |
| `BACKUP_PASSPHRASE` | Long random passphrase. Also stored in a password manager — lose it and the backups are unreadable |

## Restore

1. Download the artifact zip from the workflow run and unzip it.
2. Decrypt and unpack:
   ```
   gpg --decrypt dsp-mastery-YYYY-MM-DD.tar.gz.gpg | tar -xz
   ```
3. Restore into a **new, empty** Supabase project first (never straight over production):
   ```
   psql --single-transaction --variable ON_ERROR_STOP=1 \
     --file backup/roles.sql --file backup/schema.sql \
     --command 'SET session_replication_role = replica' \
     --file backup/data.sql --dbname "$NEW_DB_URL"
   ```
4. Check the data, then point the app at it or copy the needed rows back.

Not covered: Storage bucket files (slides live on the Mac in ~/DSP-Mastery/_SLIDES and can be re-uploaded with scripts/upload-slides.mjs).
