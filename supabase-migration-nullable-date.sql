-- Migration: make date_iso and time nullable to support "proximamente" events without a confirmed date
ALTER TABLE events ALTER COLUMN date_iso DROP NOT NULL;
ALTER TABLE events ALTER COLUMN time DROP NOT NULL;
