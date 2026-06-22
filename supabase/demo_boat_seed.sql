-- Optional demo boat listings for Supabase.
-- 1) Register one broker/seller user in the app first.
-- 2) Copy that user's profile id from public.profiles.
-- 3) Replace YOUR_PROFILE_UUID below and run this file in Supabase SQL editor.

insert into public.boats (
  owner_id, title, make, model, year, price_gbp, length_ft, beam_ft, draft_ft,
  location, country, category, fuel_type, engine_summary, engine_hours,
  description, main_image_url, status, featured
) values
('YOUR_PROFILE_UUID', 'Fairline 40 Flybridge Aft Cabin', 'Fairline', '40 Flybridge', 1986, 42500, 40, 13.4, 3.4, 'Fambridge, Essex', 'United Kingdom', 'Flybridge cruiser', 'Diesel', 'Twin Volvo Penta TAMD61A shaft-drive diesels. Generator fitted.', 1860, 'A substantial British flybridge cruiser with large saloon, two main cabins and useful aft crew/utility cabin.', 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80', 'approved', true),
('YOUR_PROFILE_UUID', 'Princess 388 Flybridge', 'Princess', '388', 1991, 69500, 39, 13.1, 3.3, 'Cowes, Isle of Wight', 'United Kingdom', 'Flybridge cruiser', 'Diesel', 'Twin Volvo Penta TAMD61A diesels with shaft drive and updated navigation.', 1420, 'Well-regarded Princess flybridge cruiser with spacious accommodation, aft cockpit and proven offshore capability.', 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=1200&q=80', 'approved', true),
('YOUR_PROFILE_UUID', 'Sunseeker Portofino 400', 'Sunseeker', 'Portofino 400', 1998, 89950, 40, 12.2, 3.2, 'Chatham, Kent', 'United Kingdom', 'Sports cruiser', 'Diesel', 'Twin Cummins MerCruiser 320hp diesels on serviced outdrives.', 980, 'Stylish British sports cruiser with large cockpit and comfortable accommodation below.', 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1200&q=80', 'approved', true);
