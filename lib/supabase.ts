import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Get the public URL for a file in the event-images bucket.
 */
export function getStorageUrl(path: string): string {
    if (!path) return '';
    // If it's already an absolute URL (e.g. unsplash or existing public files), return as-is
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/')) {
        return path;
    }
    const { data } = supabase.storage.from('event-images').getPublicUrl(path);
    return data.publicUrl;
}
