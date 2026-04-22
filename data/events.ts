import { supabase, getStorageUrl } from '@/lib/supabase';

// ── Types ──────────────────────────────────────────────────
export type EventCategory = 'recital' | 'cultural' | 'deportivo' | 'familiar' | 'feria';
export type EventStatus = 'disponible' | 'agotado' | 'ultimos' | 'proximamente';

export interface Event {
  id: string;
  slug: string;
  title: string;
  category: EventCategory;
  dateISO: string | null;
  time: string | null;
  shortDescription: string;
  longDescription: string;
  image: string;
  gallery: string[];
  videoClips: { id: string; title: string; thumbnail: string; url: string }[];
  ticketUrl: string;
  status: EventStatus;
  priceLabel: string;
  isFree: boolean;
  tags: string[];
  lineup?: string[];
}

// ── DB row → App model mapper ──────────────────────────────
// Supabase returns snake_case columns; we map to camelCase.
function mapRow(row: any): Event {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    dateISO: row.date_iso ?? null,
    time: row.time ?? null,
    shortDescription: row.short_description,
    longDescription: row.long_description,
    image: getStorageUrl(row.image ?? ''),
    gallery: (row.gallery ?? []).map((g: string) => getStorageUrl(g)),
    videoClips: row.video_clips ?? [],
    ticketUrl: row.ticket_url ?? '',
    status: row.status,
    priceLabel: row.price_label,
    isFree: row.is_free ?? false,
    tags: row.tags ?? [],
    lineup: row.lineup ?? [],
  };
}

// ── App model → DB row mapper (for inserts/updates) ────────
export function toDbRow(event: Partial<Event>) {
  const row: Record<string, any> = {};
  if (event.slug !== undefined) row.slug = event.slug;
  if (event.title !== undefined) row.title = event.title;
  if (event.category !== undefined) row.category = event.category;
  if (event.dateISO !== undefined) row.date_iso = event.dateISO || null;
  if (event.time !== undefined) row.time = event.time || null;
  if (event.shortDescription !== undefined) row.short_description = event.shortDescription;
  if (event.longDescription !== undefined) row.long_description = event.longDescription;
  if (event.image !== undefined) row.image = event.image;
  if (event.gallery !== undefined) row.gallery = event.gallery;
  if (event.videoClips !== undefined) row.video_clips = event.videoClips;
  if (event.ticketUrl !== undefined) row.ticket_url = event.ticketUrl;
  if (event.status !== undefined) row.status = event.status;
  if (event.priceLabel !== undefined) row.price_label = event.priceLabel;
  if (event.isFree !== undefined) row.is_free = event.isFree;
  if (event.tags !== undefined) row.tags = event.tags;
  if (event.lineup !== undefined) row.lineup = event.lineup;
  return row;
}

// ── CRUD Functions ─────────────────────────────────────────

/** Fetch all events ordered by date */
export async function getEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date_iso', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }
  return (data ?? []).map(mapRow);
}

/** Fetch a single event by slug */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching event:', error);
    return null;
  }
  return data ? mapRow(data) : null;
}

/** Create a new event */
export async function createEvent(event: Omit<Event, 'id'>): Promise<Event | null> {
  const { data, error } = await supabase
    .from('events')
    .insert(toDbRow(event))
    .select()
    .single();

  if (error) {
    console.error('Error creating event:', error);
    throw error;
  }
  return data ? mapRow(data) : null;
}

/** Update an existing event by ID */
export async function updateEvent(id: string, updates: Partial<Event>): Promise<Event | null> {
  const row = toDbRow(updates);
  row.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from('events')
    .update(row)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating event:', error);
    throw error;
  }
  return data ? mapRow(data) : null;
}

/** Delete an event by ID */
export async function deleteEvent(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
  return true;
}

/** Upload an image to the event-images bucket */
export async function uploadEventImage(file: File, path: string): Promise<string> {
  const { error } = await supabase.storage
    .from('event-images')
    .upload(path, file, { upsert: true });

  if (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
  return path;
}

/** Delete an image from the event-images bucket */
export async function deleteEventImage(path: string): Promise<void> {
  const { error } = await supabase.storage
    .from('event-images')
    .remove([path]);

  if (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}
