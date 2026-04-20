-- ==============================================================
-- Supabase Keepalive Mechanism
-- ==============================================================

-- Create API schema if it does not exist
CREATE SCHEMA IF NOT EXISTS api;

-- Create the keepalive table
CREATE TABLE IF NOT EXISTS api.supabase_keepalive (
  id INT PRIMARY KEY,
  last_keepalive TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE api.supabase_keepalive ENABLE ROW LEVEL SECURITY;

-- Grant minimal permissions on the schema
GRANT USAGE ON SCHEMA api TO anon, authenticated, service_role;

-- To make security invoker work, we must grant table permissions to the invokers so the function can run
GRANT SELECT, INSERT, UPDATE ON api.supabase_keepalive TO anon, authenticated, service_role;

-- Restrict what anon/authenticated can do: only id=1 can be modified
CREATE POLICY "Allow id 1 only" ON api.supabase_keepalive
  FOR ALL
  USING (id = 1)
  WITH CHECK (id = 1);

-- Create the keepalive function
CREATE OR REPLACE FUNCTION api.keepalive()
RETURNS json
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
DECLARE
  current_time_val TIMESTAMPTZ;
BEGIN
  -- Idempotent upsert on a single row
  INSERT INTO api.supabase_keepalive (id, last_keepalive)
  VALUES (1, now())
  ON CONFLICT (id) DO UPDATE SET last_keepalive = EXCLUDED.last_keepalive
  RETURNING last_keepalive INTO current_time_val;

  RETURN json_build_object(
    'ok', true,
    'timestamp', current_time_val
  );
END;
$$;

-- Grant execute on the keepalive function
GRANT EXECUTE ON FUNCTION api.keepalive() TO anon, authenticated, service_role;

-- ==============================================================
-- Public wrapper for seamless PostgREST access
-- ==============================================================
-- By default, Supabase only exposes the 'public' schema via API.
-- We add a wrapper in 'public' so the keepalive RPC can be called 
-- easily at /rest/v1/rpc/keepalive without changing db schema configs.

CREATE OR REPLACE FUNCTION public.keepalive()
RETURNS json
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
BEGIN
  RETURN api.keepalive();
END;
$$;

GRANT EXECUTE ON FUNCTION public.keepalive() TO anon, authenticated, service_role;
