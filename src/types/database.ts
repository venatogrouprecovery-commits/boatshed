export type Role = 'buyer' | 'seller' | 'broker' | 'admin';
export type ListingStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'sold';

export type Boat = {
  id: string;
  owner_id: string;
  title: string;
  make: string;
  model: string;
  year: number | null;
  price_gbp: number | null;
  length_ft: number | null;
  beam_ft: number | null;
  draft_ft: number | null;
  location: string;
  country: string;
  category: string;
  fuel_type: string | null;
  seller_type?: string | null;
  engine_summary: string | null;
  engine_hours: number | null;
  description: string;
  main_image_url: string | null;
  status: ListingStatus;
  featured: boolean;
  created_at: string;
};

export type Profile = {
  id: string;
  full_name: string | null;
  company_name: string | null;
  role: Role;
};
