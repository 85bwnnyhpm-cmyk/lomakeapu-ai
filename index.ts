import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export type Plan = 'free' | 'plus' | 'family';

export interface Profile {
  id: string;
  plan: Plan;
  created_at: string;
}

export interface Analysis {
  id: string;
  user_id: string;
  filename: string | null;
  original_text: string;
  explanation: string;
  key_points: string[];
  action_items: string[];
  draft_response: string | null;
  created_at: string;
}

export const FREE_DAILY_LIMIT = 3;

export async function getDailyUsage(userId: string): Promise<number> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const { count } = await supabase
    .from('analyses')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', today.toISOString());
  return count ?? 0;
}
