import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zkfmmurtionfafbzpohy.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key-here'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          avatar_url: string | null
          full_name: string | null
          created_at: string
        }
        Insert: {
          id: string
          username?: string | null
          avatar_url?: string | null
          full_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          avatar_url?: string | null
          full_name?: string | null
          created_at?: string
        }
      }
      uploads: {
        Row: {
          id: string
          user_id: string | null
          title: string | null
          type: string | null
          url: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          title?: string | null
          type?: string | null
          url?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          title?: string | null
          type?: string | null
          url?: string | null
          created_at?: string | null
        }
      }
    }
  }
}
  user_id: string
  title: string
  type: 'audio' | 'video' | 'image' | 'document'
  url: string
  file_size?: number
  duration?: number
  created_at: string
}

export interface Revenue {
  id: string
  user_id: string
  amount: number
  source: string
  type: 'streaming' | 'sales' | 'licensing'
  created_at: string
}

export interface LoanRecord {
  id: string
  user_id: string
  amount: number
  purpose: string
  status: 'pending' | 'approved' | 'rejected' | 'paid'
  interest_rate: number
  term_months: number
  created_at: string
  approved_at?: string
}