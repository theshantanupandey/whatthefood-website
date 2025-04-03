export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          subject: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          subject: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          subject?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          created_at: string | null
          email: string
          id: string
          interests: string[] | null
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          interests?: string[] | null
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          interests?: string[] | null
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      partner_applications: {
        Row: {
          additional_info: string | null
          brand_deck_url: string | null
          brand_name: string
          collaboration_types: string[]
          contact_name: string
          created_at: string | null
          email: string
          id: string
          industry_type: string
          phone: string
          terms_agreed: boolean
          updated_at: string | null
          website: string
        }
        Insert: {
          additional_info?: string | null
          brand_deck_url?: string | null
          brand_name: string
          collaboration_types: string[]
          contact_name: string
          created_at?: string | null
          email: string
          id?: string
          industry_type: string
          phone: string
          terms_agreed: boolean
          updated_at?: string | null
          website: string
        }
        Update: {
          additional_info?: string | null
          brand_deck_url?: string | null
          brand_name?: string
          collaboration_types?: string[]
          contact_name?: string
          created_at?: string | null
          email?: string
          id?: string
          industry_type?: string
          phone?: string
          terms_agreed?: boolean
          updated_at?: string | null
          website?: string
        }
        Relationships: []
      }
      vendor_applications: {
        Row: {
          additional_comments: string | null
          additional_info: string | null
          address: string
          business_name: string
          business_type: string
          city_state: string
          created_at: string | null
          cuisines: string[]
          customization_willing: boolean
          delivery_options: string[]
          email: string
          existing_delivery: boolean
          food_photo_urls: string[] | null
          fssai_standards: boolean
          gst_number: string | null
          health_certifications: string[]
          id: string
          kitchen_photo_urls: string[] | null
          meal_types: string[]
          meals_per_day: number
          owner_name: string
          packaging_option: string
          phone: string
          price_range: string
          registration_number: string | null
          terms_agreed: boolean
          updated_at: string | null
          vegetarian_options: boolean
          why_partner: string
        }
        Insert: {
          additional_comments?: string | null
          additional_info?: string | null
          address: string
          business_name: string
          business_type: string
          city_state: string
          created_at?: string | null
          cuisines: string[]
          customization_willing: boolean
          delivery_options: string[]
          email: string
          existing_delivery: boolean
          food_photo_urls?: string[] | null
          fssai_standards: boolean
          gst_number?: string | null
          health_certifications: string[]
          id?: string
          kitchen_photo_urls?: string[] | null
          meal_types: string[]
          meals_per_day: number
          owner_name: string
          packaging_option: string
          phone: string
          price_range: string
          registration_number?: string | null
          terms_agreed: boolean
          updated_at?: string | null
          vegetarian_options: boolean
          why_partner: string
        }
        Update: {
          additional_comments?: string | null
          additional_info?: string | null
          address?: string
          business_name?: string
          business_type?: string
          city_state?: string
          created_at?: string | null
          cuisines?: string[]
          customization_willing?: boolean
          delivery_options?: string[]
          email?: string
          existing_delivery?: boolean
          food_photo_urls?: string[] | null
          fssai_standards?: boolean
          gst_number?: string | null
          health_certifications?: string[]
          id?: string
          kitchen_photo_urls?: string[] | null
          meal_types?: string[]
          meals_per_day?: number
          owner_name?: string
          packaging_option?: string
          phone?: string
          price_range?: string
          registration_number?: string | null
          terms_agreed?: boolean
          updated_at?: string | null
          vegetarian_options?: boolean
          why_partner?: string
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
