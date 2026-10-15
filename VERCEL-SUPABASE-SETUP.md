# Joan Andrews Clinic: Vercel + Supabase setup

## What this branch changes
- Bundles imported images into the Vite production build instead of requesting source-only `/src/assets/images/...` URLs.
- Adds a Vercel serverless endpoint at `POST /api/consultations`.
- Updates the booking forms to show success only after the API confirms the request was saved.
- Adds the SQL needed to create the private consultation table.

## Supabase setup
1. Restore/activate the Supabase project if it is paused.
2. Open **SQL Editor**, paste the contents of `supabase/setup-consultation-requests.sql`, and run it.
3. In **Project Settings → API Keys**, obtain the project URL and a server-only service-role/secret credential compatible with the REST API.
4. Never put a service-role/secret credential in React code, `VITE_*` variables, GitHub files, or the browser.

## Vercel environment variables
Add these for the correct Vercel project and deployment environments:
- `SUPABASE_URL` = your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` = your server-only service-role key

Redeploy after adding the variables.

## Test
- Open `/api/consultations` in a browser: it should return **405 Method not allowed** because the endpoint accepts POST only.
- Submit a test request from the booking form, then inspect `public.consultation_requests` in Supabase.
- Verify images on the deployed Vercel URL at desktop and mobile sizes.

## Important
The project currently has a hard-coded sample calendar and sample clinic content. This branch does not verify real appointment availability; submissions are requests for the clinic to confirm. Do not use this as a live patient system until the clinic's privacy, retention, access, spam protection, and notification requirements are reviewed.
