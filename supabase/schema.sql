-- Boatshed Marketplace production-shaped schema for Supabase/PostgreSQL.
-- Run this in Supabase SQL editor after creating the project.

create extension if not exists "pgcrypto";

create type public.user_role as enum ('buyer', 'seller', 'broker', 'admin');
create type public.listing_status as enum ('draft', 'pending', 'approved', 'rejected', 'sold');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  company_name text,
  role public.user_role not null default 'buyer',
  phone text,
  website text,
  created_at timestamptz not null default now()
);

create table public.boats (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  make text not null,
  model text not null,
  year integer,
  price_gbp integer,
  length_ft numeric,
  beam_ft numeric,
  draft_ft numeric,
  location text not null,
  country text not null default 'United Kingdom',
  latitude numeric,
  longitude numeric,
  category text not null,
  fuel_type text,
  engine_summary text,
  engine_hours integer,
  vat_status text,
  survey_date date,
  finance_outstanding boolean default false,
  description text not null,
  main_image_url text,
  status public.listing_status not null default 'pending',
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.listing_images (
  id uuid primary key default gen_random_uuid(),
  boat_id uuid not null references public.boats(id) on delete cascade,
  url text not null,
  alt text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  boat_id uuid not null references public.boats(id) on delete cascade,
  buyer_id uuid references public.profiles(id) on delete set null,
  name text,
  email text not null,
  phone text,
  message text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.favourites (
  user_id uuid references public.profiles(id) on delete cascade,
  boat_id uuid references public.boats(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, boat_id)
);

create index boats_search_idx on public.boats using gin (
  to_tsvector('english', coalesce(title,'') || ' ' || coalesce(make,'') || ' ' || coalesce(model,'') || ' ' || coalesce(description,''))
);
create index boats_status_created_idx on public.boats(status, created_at desc);
create index boats_owner_idx on public.boats(owner_id);
create index boats_price_idx on public.boats(price_gbp);
create index boats_location_idx on public.boats(location);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    coalesce((new.raw_user_meta_data->>'role')::public.user_role, 'buyer')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
security definer
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

alter table public.profiles enable row level security;
alter table public.boats enable row level security;
alter table public.listing_images enable row level security;
alter table public.enquiries enable row level security;
alter table public.favourites enable row level security;

create policy "profiles read own or admin" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "profiles update own" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

create policy "approved boats are public" on public.boats for select using (status = 'approved' or owner_id = auth.uid() or public.is_admin());
create policy "owners create boats" on public.boats for insert with check (owner_id = auth.uid());
create policy "owners update own unapproved boats" on public.boats for update using (owner_id = auth.uid() or public.is_admin()) with check (owner_id = auth.uid() or public.is_admin());
create policy "admins delete boats" on public.boats for delete using (public.is_admin());

create policy "public listing images" on public.listing_images for select using (
  exists (select 1 from public.boats b where b.id = boat_id and (b.status = 'approved' or b.owner_id = auth.uid() or public.is_admin()))
);
create policy "owners manage listing images" on public.listing_images for all using (
  exists (select 1 from public.boats b where b.id = boat_id and (b.owner_id = auth.uid() or public.is_admin()))
) with check (
  exists (select 1 from public.boats b where b.id = boat_id and (b.owner_id = auth.uid() or public.is_admin()))
);

create policy "anyone can create enquiries" on public.enquiries for insert with check (true);
create policy "owners and admins read enquiries" on public.enquiries for select using (
  public.is_admin() or exists (select 1 from public.boats b where b.id = boat_id and b.owner_id = auth.uid())
);

create policy "users manage own favourites" on public.favourites for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Optional seed data. Replace owner_id with a real profile id once a user exists.
-- update public.profiles set role = 'admin' where id = 'your-user-uuid';

-- Demo marketplace expansion: chandlery, marine services and marina offers.
-- These tables are intentionally public-read so the marketplace can show more than boats.

create type public.product_condition as enum ('New', 'Used', 'Refurbished');

create table public.chandlery_products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  price_gbp integer not null,
  location text not null,
  vendor text not null,
  condition public.product_condition not null default 'New',
  image_url text,
  description text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.marine_services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  area text not null,
  rating numeric,
  response_time text,
  image_url text,
  description text not null,
  services text[] not null default '{}',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.marina_offers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text not null,
  berth_size text,
  price_note text,
  image_url text,
  facilities text[] not null default '{}',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.chandlery_products enable row level security;
alter table public.marine_services enable row level security;
alter table public.marina_offers enable row level security;

create policy "active chandlery products are public" on public.chandlery_products for select using (active = true);
create policy "active marine services are public" on public.marine_services for select using (active = true);
create policy "active marina offers are public" on public.marina_offers for select using (active = true);

create policy "admins manage chandlery" on public.chandlery_products for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage marine services" on public.marine_services for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage marina offers" on public.marina_offers for all using (public.is_admin()) with check (public.is_admin());

insert into public.chandlery_products (name, category, price_gbp, location, vendor, condition, image_url, description) values
('Lewmar Ocean Hatch 60', 'Deck hardware', 689, 'Southampton', 'Solent Chandlery', 'New', 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=900&q=80', 'Replacement deck hatch with low-profile frame, acrylic lens and seal kit.'),
('Victron MultiPlus-II 12/3000/120', 'Electrical', 1095, 'Portsmouth', 'Marine Power Direct', 'New', 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80', 'Inverter/charger package for serious onboard AC and battery management upgrades.'),
('Garmin GPSMAP 8412xsv', 'Navigation', 2195, 'Poole', 'NavTech Marine', 'Refurbished', 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=900&q=80', 'Large touchscreen MFD suitable for flybridge or lower helm installations.'),
('Dometic NRX 130C Marine Fridge', 'Galley', 879, 'Cowes', 'Island Marine Supplies', 'New', 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=900&q=80', 'Compressor fridge for 12V/24V marine installations, suitable for galley refits.');

insert into public.marine_services (name, category, area, rating, response_time, image_url, description, services) values
('Solent Marine Engineering', 'Diesel engineering', 'Portsmouth, Hamble, Cowes', 4.9, 'Usually replies within 2 hours', 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=80', 'Volvo Penta, Yanmar and Cummins servicing, heat exchangers, turbo removal and recommissioning.', array['Engine servicing','Cooling systems','Pre-purchase checks']),
('South Coast Upholstery Co.', 'Marine upholstery', 'Dorset, Hampshire, Isle of Wight', 4.8, 'Taking bookings for July', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80', 'Saloon seating, cockpit cushions, ribbed backrest redesigns and exterior covers.', array['Saloon upholstery','Cockpit cushions','Canvas repairs']),
('Marine Electronics Lab', 'Navigation electronics', 'UK-wide remote support', 4.9, 'Same-day diagnostics', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80', 'Chartplotter upgrades, NMEA 2000, Signal K dashboards, radar integration and autopilot troubleshooting.', array['NMEA 2000','Chartplotters','Signal K']);

insert into public.marina_offers (name, location, berth_size, price_note, image_url, facilities) values
('Island Harbour Marina', 'Isle of Wight', 'Up to 45 ft', 'Annual and visitor berths', 'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&w=900&q=80', array['Pontoon berths','Shore power','Water','Onsite restaurant']),
('Fambridge Yacht Haven', 'River Crouch, Essex', 'Up to 50 ft', 'River and marina options', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80', array['Lift-out','Hardstanding','Engineering','Fuel nearby']),
('Chichester Marina', 'West Sussex', 'Up to 60 ft', 'Brokerage-friendly marina', 'https://images.unsplash.com/photo-1562979314-bee7453e911c?auto=format&fit=crop&w=900&q=80', array['Fuel','Restaurants','Chandlery','Repair services']);
