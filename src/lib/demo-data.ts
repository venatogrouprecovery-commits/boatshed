import { Boat } from '@/types/database';

export type ChandleryProduct = {
  id: string;
  name: string;
  category: string;
  price_gbp: number;
  location: string;
  vendor: string;
  image_url: string;
  condition: 'New' | 'Used' | 'Refurbished';
  description: string;
};

export type MarineService = {
  id: string;
  name: string;
  category: string;
  area: string;
  rating: number;
  response: string;
  image_url: string;
  description: string;
  services: string[];
};

export type MarinaListing = {
  id: string;
  name: string;
  location: string;
  berth_size: string;
  price_note: string;
  image_url: string;
  facilities: string[];
};

const now = new Date().toISOString();

export const demoBoats: Boat[] = [
  {
    id: 'demo-fairline-40-flybridge', owner_id: 'demo-broker-1', title: 'Fairline 40 Flybridge Aft Cabin', make: 'Fairline', model: '40 Flybridge', year: 1986,
    price_gbp: 42500, length_ft: 40, beam_ft: 13.4, draft_ft: 3.4, location: 'Fambridge, Essex', country: 'United Kingdom', category: 'Flybridge cruiser',
    fuel_type: 'Diesel', engine_summary: 'Twin Volvo Penta TAMD61A shaft-drive diesels. Generator fitted. Recent lift with running gear inspection.', engine_hours: 1860,
    description: 'A substantial British flybridge cruiser with large saloon, two main cabins and useful aft crew/utility cabin. Presented as a practical liveaboard or coastal cruising platform with strong diesel machinery, generous deck space and scope for cosmetic upgrades. Demo listing for marketplace presentation.',
    main_image_url: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80', status: 'approved', featured: true, created_at: now
  },
  {
    id: 'demo-princess-388', owner_id: 'demo-broker-2', title: 'Princess 388 Flybridge', make: 'Princess', model: '388', year: 1991,
    price_gbp: 69500, length_ft: 39, beam_ft: 13.1, draft_ft: 3.3, location: 'Cowes, Isle of Wight', country: 'United Kingdom', category: 'Flybridge cruiser',
    fuel_type: 'Diesel', engine_summary: 'Twin Volvo Penta TAMD61A diesels with shaft drive, bow thruster and updated navigation package.', engine_hours: 1420,
    description: 'Well-regarded Princess flybridge cruiser with spacious accommodation, aft cockpit, flybridge helm and proven offshore capability. Ideal Solent family boat with comfortable coastal range. Demo listing for presentation use.',
    main_image_url: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=1200&q=80', status: 'approved', featured: true, created_at: now
  },
  {
    id: 'demo-sunseeker-portofino-400', owner_id: 'demo-broker-3', title: 'Sunseeker Portofino 400', make: 'Sunseeker', model: 'Portofino 400', year: 1998,
    price_gbp: 89950, length_ft: 40, beam_ft: 12.2, draft_ft: 3.2, location: 'Chatham, Kent', country: 'United Kingdom', category: 'Sports cruiser',
    fuel_type: 'Diesel', engine_summary: 'Twin Cummins MerCruiser 320hp diesels on serviced outdrives. Hull recently cleaned and antifouled.', engine_hours: 980,
    description: 'A stylish British sports cruiser with large cockpit, opening hardtop-style social layout and comfortable accommodation below. Strong demo advert for high-impact marketplace photography and enquiry flow.',
    main_image_url: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1200&q=80', status: 'approved', featured: true, created_at: now
  },
  {
    id: 'demo-moody-333', owner_id: 'demo-private-1', title: 'Moody 333 Centre Cockpit', make: 'Moody', model: '333', year: 1983,
    price_gbp: 36500, length_ft: 33, beam_ft: 11.5, draft_ft: 5.0, location: 'Portsmouth Harbour', country: 'United Kingdom', category: 'Sailing yacht',
    fuel_type: 'Diesel', engine_summary: 'Beta Marine B35 diesel replacement engine with low hours and recent service history.', engine_hours: 190,
    description: 'Classic Moody centre-cockpit cruiser with proper aft cabin, safe deep cockpit and practical offshore layout. Good example of the marketplace supporting sail as well as motor inventory.',
    main_image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80', status: 'approved', featured: false, created_at: now
  },
  {
    id: 'demo-bavaria-44', owner_id: 'demo-broker-4', title: 'Bavaria 44 Cruiser', make: 'Bavaria', model: '44 Cruiser', year: 2003,
    price_gbp: 78500, length_ft: 44, beam_ft: 13.9, draft_ft: 6.4, location: 'Lefkas, Greece', country: 'Greece', category: 'Sailing yacht',
    fuel_type: 'Diesel', engine_summary: 'Volvo Penta diesel, saildrive, solar charging and recent standing rigging inspection.', engine_hours: 2350,
    description: 'Spacious Mediterranean cruising yacht with four-cabin layout, large cockpit and good inventory. Demo international listing to show global marketplace capability.',
    main_image_url: 'https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?auto=format&fit=crop&w=1200&q=80', status: 'approved', featured: false, created_at: now
  },
  {
    id: 'demo-ribeye-785', owner_id: 'demo-dealer-1', title: 'Ribeye A785 Custom RIB', make: 'Ribeye', model: 'A785', year: 2019,
    price_gbp: 64950, length_ft: 25.7, beam_ft: 8.2, draft_ft: 1.8, location: 'Poole, Dorset', country: 'United Kingdom', category: 'RIB',
    fuel_type: 'Petrol', engine_summary: 'Yamaha 300hp outboard with digital controls, chartplotter, VHF and road trailer.', engine_hours: 310,
    description: 'Fast family RIB with premium seating, deep-V hull and high-spec electronics. Useful demo listing for trailer boats, tenders and watersports categories.',
    main_image_url: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=1200&q=80', status: 'approved', featured: false, created_at: now
  },
  {
    id: 'demo-sealine-f43', owner_id: 'demo-broker-5', title: 'Sealine F43 Flybridge', make: 'Sealine', model: 'F43', year: 2001,
    price_gbp: 119950, length_ft: 43, beam_ft: 13.8, draft_ft: 3.7, location: 'Southampton, Hampshire', country: 'United Kingdom', category: 'Flybridge cruiser',
    fuel_type: 'Diesel', engine_summary: 'Twin Volvo Penta TAMD63P diesels, shaft drive, generator and heating.', engine_hours: 1120,
    description: 'Popular Sealine flybridge model with excellent aft cabin arrangement and sociable saloon. Presented in clean condition with strong family cruising appeal.',
    main_image_url: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=1200&q=80', status: 'approved', featured: true, created_at: now
  },
  {
    id: 'demo-beneteau-antares-9', owner_id: 'demo-dealer-2', title: 'Beneteau Antares 9', make: 'Beneteau', model: 'Antares 9', year: 2022,
    price_gbp: 139000, length_ft: 29, beam_ft: 9.9, draft_ft: 2.6, location: 'Brighton Marina', country: 'United Kingdom', category: 'Weekender',
    fuel_type: 'Petrol', engine_summary: 'Twin Suzuki 200hp outboards with joystick-style docking aid and factory warranty balance.', engine_hours: 84,
    description: 'Modern outboard weekender with bright wheelhouse, two cabins and efficient cruising performance. Demo dealer listing with near-new appeal.',
    main_image_url: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1200&q=80', status: 'approved', featured: false, created_at: now
  }
];

export const chandleryProducts: ChandleryProduct[] = [
  { id: 'ch-001', name: 'Lewmar Ocean Hatch 60', category: 'Deck hardware', price_gbp: 689, location: 'Southampton', vendor: 'Solent Chandlery', condition: 'New', image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=900&q=80', description: 'Replacement deck hatch with low-profile frame, acrylic lens and seal kit.' },
  { id: 'ch-002', name: 'Victron MultiPlus-II 12/3000/120', category: 'Electrical', price_gbp: 1095, location: 'Portsmouth', vendor: 'Marine Power Direct', condition: 'New', image_url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80', description: 'Inverter/charger package for serious onboard AC and battery management upgrades.' },
  { id: 'ch-003', name: 'Garmin GPSMAP 8412xsv', category: 'Navigation', price_gbp: 2195, location: 'Poole', vendor: 'NavTech Marine', condition: 'Refurbished', image_url: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=900&q=80', description: 'Large touchscreen MFD suitable for flybridge or lower helm installations.' },
  { id: 'ch-004', name: 'Dometic NRX 130C Marine Fridge', category: 'Galley', price_gbp: 879, location: 'Cowes', vendor: 'Island Marine Supplies', condition: 'New', image_url: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=900&q=80', description: 'Compressor fridge for 12V/24V marine installations, suitable for galley refits.' },
  { id: 'ch-005', name: 'Volvo Penta VDO Gauge Set', category: 'Engine instruments', price_gbp: 395, location: 'Chichester', vendor: 'Classic Volvo Marine', condition: 'Used', image_url: 'https://images.unsplash.com/photo-1614070711771-8dd001581e01?auto=format&fit=crop&w=900&q=80', description: 'Cosmetic used gauge bundle for classic Volvo Penta diesel dashboards.' },
  { id: 'ch-006', name: 'Seaflo 55LPM Bilge Pump Kit', category: 'Safety', price_gbp: 74, location: 'Bournemouth', vendor: 'Harbour Parts UK', condition: 'New', image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80', description: 'Automatic bilge pump kit with float switch, hose tails and wiring guide.' }
];

export const marineServices: MarineService[] = [
  { id: 'svc-001', name: 'Solent Marine Engineering', category: 'Diesel engineering', area: 'Portsmouth, Hamble, Cowes', rating: 4.9, response: 'Usually replies within 2 hours', image_url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=80', description: 'Volvo Penta, Yanmar and Cummins servicing, heat exchangers, turbo removal and recommissioning.', services: ['Engine servicing', 'Cooling systems', 'Pre-purchase checks'] },
  { id: 'svc-002', name: 'South Coast Upholstery Co.', category: 'Marine upholstery', area: 'Dorset, Hampshire, Isle of Wight', rating: 4.8, response: 'Taking bookings for July', image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80', description: 'Saloon seating, cockpit cushions, ribbed backrest redesigns and exterior covers.', services: ['Saloon upholstery', 'Cockpit cushions', 'Canvas repairs'] },
  { id: 'svc-003', name: 'Coppercoat & Antifoul Direct', category: 'Hull works', area: 'Essex, Kent, South Coast', rating: 4.7, response: 'Quote in 24 hours', image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80', description: 'Hull preparation, antifouling, coppercoat refresh and running gear polishing.', services: ['Antifouling', 'Coppercoat', 'Anodes'] },
  { id: 'svc-004', name: 'Marine Electronics Lab', category: 'Navigation electronics', area: 'UK-wide remote support', rating: 4.9, response: 'Same-day diagnostics', image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80', description: 'Chartplotter upgrades, NMEA 2000, Signal K dashboards, radar integration and autopilot troubleshooting.', services: ['NMEA 2000', 'Chartplotters', 'Signal K'] },
  { id: 'svc-005', name: 'Boat Transport Network', category: 'Transport & delivery', area: 'UK and Europe', rating: 4.6, response: 'Route quote in 48 hours', image_url: 'https://images.unsplash.com/photo-1599912027611-484b9fc447af?auto=format&fit=crop&w=900&q=80', description: 'Skippered deliveries, low-loader transport, crane coordination and passage planning.', services: ['Road transport', 'Skipper delivery', 'Crane booking'] },
  { id: 'svc-006', name: 'Classic Teak & Trim', category: 'Interior refit', area: 'Hamble, Lymington, Southampton', rating: 4.8, response: 'Workshop slots available', image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80', description: 'Teak restoration, veneer repairs, galley worktops, flooring and saloon trim upgrades.', services: ['Teak restoration', 'Worktops', 'Flooring'] }
];

export const marinaListings: MarinaListing[] = [
  { id: 'mar-001', name: 'Island Harbour Marina', location: 'Isle of Wight', berth_size: 'Up to 45 ft', price_note: 'Annual and visitor berths', image_url: 'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&w=900&q=80', facilities: ['Pontoon berths', 'Shore power', 'Water', 'Onsite restaurant'] },
  { id: 'mar-002', name: 'Fambridge Yacht Haven', location: 'River Crouch, Essex', berth_size: 'Up to 50 ft', price_note: 'River and marina options', image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80', facilities: ['Lift-out', 'Hardstanding', 'Engineering', 'Fuel nearby'] },
  { id: 'mar-003', name: 'Chichester Marina', location: 'West Sussex', berth_size: 'Up to 60 ft', price_note: 'Brokerage-friendly marina', image_url: 'https://images.unsplash.com/photo-1562979314-bee7453e911c?auto=format&fit=crop&w=900&q=80', facilities: ['Fuel', 'Restaurants', 'Chandlery', 'Repair services'] }
];

export type MarketplaceOffer = {
  id: string;
  type: string;
  title: string;
  description: string;
  price_note: string;
  href: string;
  image_url: string;
};

export type VideoGuide = {
  id: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  image_url: string;
};

export type BoatReview = {
  id: string;
  title: string;
  type: string;
  summary: string;
  image_url: string;
};

export type MarineGuide = {
  id: string;
  title: string;
  category: string;
  summary: string;
};

export const marketplaceOffers: MarketplaceOffer[] = [
  {
    id: 'offer-survey-package',
    type: 'Survey offer',
    title: 'Pre-purchase survey slots this month',
    description: 'Independent hull, machinery and sea-trial inspections for boats up to 50ft across the Solent.',
    price_note: 'From £695',
    href: '/services',
    image_url: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1000&q=82'
  },
  {
    id: 'offer-electronics-refit',
    type: 'Electronics bundle',
    title: 'Navigation refit: MFD, AIS and NMEA 2000',
    description: 'Package pricing for chartplotter upgrades, transducer fitting, AIS and clean helm wiring.',
    price_note: 'Save up to 15%',
    href: '/services',
    image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=82'
  },
  {
    id: 'offer-berth-iow',
    type: 'Berth availability',
    title: '45ft annual berth availability — Isle of Wight',
    description: 'Visitor, seasonal and annual berthing enquiries now open for selected south coast marinas.',
    price_note: 'Check rates',
    href: '/marinas',
    image_url: 'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&w=1000&q=82'
  }
];

export const videoGuides: VideoGuide[] = [
  {
    id: 'video-survey',
    title: 'What a marine survey should really cover',
    category: 'Buyer guide',
    duration: '8 min',
    description: 'Hull, moisture, machinery, sea-cocks, rigging and the common red flags buyers miss.',
    image_url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1000&q=82'
  },
  {
    id: 'video-flybridge',
    title: 'Flybridge cruiser buying checklist',
    category: 'Boat review',
    duration: '11 min',
    description: 'Engines, shafts, stern gear, canopy condition, flybridge leaks and accommodation checks.',
    image_url: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=1000&q=82'
  },
  {
    id: 'video-costs',
    title: 'Real ownership costs for a 40ft motor boat',
    category: 'Ownership',
    duration: '14 min',
    description: 'Fuel, berthing, servicing, insurance, lifting, anodes, electronics and unexpected costs.',
    image_url: 'https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?auto=format&fit=crop&w=1000&q=82'
  }
];

export const boatReviews: BoatReview[] = [
  {
    id: 'review-princess-388',
    title: 'Princess 388: classic British flybridge value',
    type: 'Broker review',
    summary: 'Why 1990s flybridge cruisers still attract serious family buyers.',
    image_url: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=700&q=82'
  },
  {
    id: 'review-moody-333',
    title: 'Moody 333: compact centre-cockpit practicality',
    type: 'Owner review',
    summary: 'A proven sailing cruiser with separate aft-cabin appeal and manageable running costs.',
    image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=82'
  },
  {
    id: 'review-ribeye',
    title: 'Premium RIBs: what makes a used example worth more',
    type: 'Market insight',
    summary: 'Tube condition, electronics, trailer history and outboard hours explained.',
    image_url: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=700&q=82'
  }
];

export const marineGuides: MarineGuide[] = [
  { id: 'guide-finance', category: 'Buying', title: 'How to check finance before buying a boat', summary: 'The practical checks that reduce risk when buying privately or through a broker.' },
  { id: 'guide-transport', category: 'Logistics', title: 'Road transport vs skippered delivery', summary: 'When to lift and truck a boat, when to deliver by sea, and what each route can cost.' },
  { id: 'guide-chandlery', category: 'Refit', title: 'The first 20 things to upgrade on an older cruiser', summary: 'Safety kit, batteries, chargers, bilge pumps, navigation and comfort upgrades ranked.' },
  { id: 'guide-berthing', category: 'Marinas', title: 'Annual berth checklist for 35–45ft boats', summary: 'Depth, access, shore power, lift-out, liveaboard rules, parking and hidden fees.' }
];


export type BrandLogo = {
  name: string;
  category: string;
  domain: string;
  logo_url: string;
};

export const brandLogos: BrandLogo[] = [
  { name: 'Fairline', category: 'Boat builders', domain: 'fairline.com', logo_url: '/brand-logos/fairline.svg' },
  { name: 'Princess', category: 'Boat builders', domain: 'princessyachts.com', logo_url: '/brand-logos/princess.svg' },
  { name: 'Sunseeker', category: 'Boat builders', domain: 'sunseeker.com', logo_url: '/brand-logos/sunseeker.svg' },
  { name: 'Beneteau', category: 'Boat builders', domain: 'beneteau.com', logo_url: '/brand-logos/beneteau.svg' },
  { name: 'Jeanneau', category: 'Boat builders', domain: 'jeanneau.com', logo_url: '/brand-logos/jeanneau.svg' },
  { name: 'Bavaria', category: 'Boat builders', domain: 'bavariayachts.com', logo_url: '/brand-logos/bavaria.svg' },
  { name: 'Sealine', category: 'Boat builders', domain: 'sealine.com', logo_url: '/brand-logos/sealine.svg' },
  { name: 'Ribeye', category: 'RIBs', domain: 'ribeye.co.uk', logo_url: '/brand-logos/ribeye.svg' },
  { name: 'Volvo Penta', category: 'Engines', domain: 'volvopenta.com', logo_url: '/brand-logos/volvo-penta.svg' },
  { name: 'Mercury', category: 'Outboards', domain: 'mercuymarine.com', logo_url: '/brand-logos/mercury.svg' },
  { name: 'Yamaha', category: 'Outboards', domain: 'yamaha-motor.eu', logo_url: '/brand-logos/yamaha.svg' },
  { name: 'Suzuki', category: 'Outboards', domain: 'suzuki-marine.co.uk', logo_url: '/brand-logos/suzuki.svg' },
  { name: 'Garmin', category: 'Electronics', domain: 'garmin.com', logo_url: '/brand-logos/garmin.svg' },
  { name: 'Raymarine', category: 'Electronics', domain: 'raymarine.com', logo_url: '/brand-logos/raymarine.svg' },
  { name: 'Victron', category: 'Power systems', domain: 'victronenergy.com', logo_url: '/brand-logos/victron.svg' },
  { name: 'Lewmar', category: 'Deck hardware', domain: 'lewmar.com', logo_url: '/brand-logos/lewmar.svg' },
  { name: 'Force 4', category: 'Chandlery', domain: 'force4.co.uk', logo_url: '/brand-logos/force4.svg' },
  { name: 'Spinlock', category: 'Safety gear', domain: 'spinlock.co.uk', logo_url: '/brand-logos/spinlock.svg' },
  { name: 'Crewsaver', category: 'Life jackets', domain: 'crewsaver.com', logo_url: '/brand-logos/crewsaver.svg' },
  { name: 'Plastimo', category: 'Safety & chandlery', domain: 'plastimo.com', logo_url: '/brand-logos/plastimo.svg' },
  { name: 'Gill', category: 'Marine clothing', domain: 'gillmarine.com', logo_url: '/brand-logos/gill.svg' },
  { name: 'Musto', category: 'Marine clothing', domain: 'musto.com', logo_url: '/brand-logos/musto.svg' },
  { name: 'Helly Hansen', category: 'Marine clothing', domain: 'hellyhansen.com', logo_url: '/brand-logos/helly-hansen.svg' },
  { name: 'Navionics', category: 'Navigation', domain: 'navionics.com', logo_url: '/brand-logos/navionics.svg' }
];
