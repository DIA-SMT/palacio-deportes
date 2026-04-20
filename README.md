buen dia banda. Esto es un recuerdo de que esto no esta con npm, esta con pnpm para correrlo se necesitara instalar pnpm

## Supabase Keepalive
This project includes a stack-agnostic Supabase keepalive mechanism to prevent the Supabase Free tier project from being paused due to inactivity.

### What was added:
1. `supabase-keepalive.sql`: A standalone SQL migration that safely creates a schema (`api`), an internal state table (`supabase_keepalive`), and an idempotent RPC function (`keepalive()`) that simply upserts a single row to ensure database activity. 
2. `.github/workflows/supabase-keepalive.yml`: An external scheduled job (GitHub Action) that safely pings the RPC twice a day. This ensures the database is marked active even if no users visit the site.

### Setup & Secrets
To enable the GitHub action, go to the repository's GitHub Settings > Secrets and variables > Actions, and add the following two **Repository Secrets**:
- `SUPABASE_PROJECT_URL`: Your Supabase API URL (e.g. `https://xxxx.supabase.co`)
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key.

### Testing Manually
1. Run the `supabase-keepalive.sql` script in your Supabase SQL Editor.
2. You can manually test the keepalive trigger via your terminal by substituting your credentials:
   ```bash
   curl -X POST "https://<YOUR_PROJECT>.supabase.co/rest/v1/rpc/keepalive" \
   -H "apikey: <YOUR_ANON_KEY>" \
   -H "Authorization: Bearer <YOUR_ANON_KEY>" \
   -H "Content-Type: application/json"
   ```
   You should receive a `200 OK` JSON response: `{"ok":true,"timestamp":"..."}`
3. To test the GitHub Action manually, navigate to the `Actions` tab in GitHub, select "Supabase Keepalive", and click on "Run workflow".

### Disable or Adjust Schedule
To change how often the keepalive script runs, edit the `cron` value inside `.github/workflows/supabase-keepalive.yml`. To disable it entirely, you can simply delete the `.yml` workflow file or disable the action natively from the GitHub UI.
