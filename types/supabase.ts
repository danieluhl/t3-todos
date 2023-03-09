export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      todos: {
        Row: {
          checked: boolean
          created_at: string
          id: number
          text: string
          updated_at: string | null
        }
        Insert: {
          checked?: boolean
          created_at?: string
          id?: number
          text?: string
          updated_at?: string | null
        }
        Update: {
          checked?: boolean
          created_at?: string
          id?: number
          text?: string
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
