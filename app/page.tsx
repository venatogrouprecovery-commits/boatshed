import Link from 'next/link';
import { createClient, hasSupabaseConfig } from '@/lib/supabase-server';
import { BoatCard } from '@/components/BoatCard';
import { ProductCard, ServiceCard } from '@/components/MarketplaceCards';
import { SearchForm } from '@/components/SearchForm';
import { Boat } from '@/types/database';
import { chandleryProducts, demoBoats, marinaListings, marineServices } from '@/lib/demo-data';
import { MarineIcon } from '@/components/MarineIcons';

const heroImage = 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1800&q=85';

const focusAreas = [
  { title: 'Brokerage', text: 'Qualified boat adverts with rich photography, specs and broker lead capture.', href: '/boats', icon: 'boat' as const },
  { title: 'Chandlery', text: 'Useful marine gear, refit parts, electronics and safety equipment.', href: '/chandlery', icon: 'chandlery' as const },
  { title: 'Services', text: 'Engineers, surveyors, upholstery, transport and refit specialists.', href: '/services', icon: 'services' as const },
  { title: 'Berths', text: 'Marina offers, winter storage, lift-out yards and local facilities.', href: '/marinas', icon: 'marina' as const }
];

export default async function Home() {
  let liveBoats: Boat[] | null = null;

  if (hasSupabaseConfig()) {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from('boats')
        .select('*')
        .eq('status', 'approved')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(6);
      liveBoats = data as Boat[] | null;
    } catch {
      liveBoats = null;
    }
  }

  const boats = (liveBoats?.length ? liveBoats : demoBoats.slice(0, 6)) as Boat[];
  const leadBoat = boats[0];

  return (
    <main className="bm-page">
      <section className="bm-hero">
        <div className="bm-hero-bg" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="bm-hero-shade" />
        <div className="container bm-hero-inner">
          <div className="bm-hero-copy">
            <span className="bm-kicker">Boatshed Marketplace</span>
            <h1>The premium marine marketplace for serious buyers.</h1>
            <p>Boats, brokers, chandlery, berths and trusted marine services — presented with the polish expected from a modern global marketplace.</p>
            <div className="bm-hero-actions">
              <Link className="bm-primary" href="/boats">Explore boats</Link>
              <Link className="bm-secondary" href="/sell">Sell with Boatshed</Link>
            </div>
          </div>

          <aside className="bm-feature-panel" aria-label="Featured boat">
            <span className="bm-panel-tag">Featured listing</span>
            <h2>{leadBoat.title}</h2>
            <p>{leadBoat.location} · {leadBoat.year} · {leadBoat.length_ft} ft</p>
            <Link href={`/boats/${leadBoat.id}`}>View listing</Link>
          </aside>
        </div>
      </section>

      <div className="container bm-search-wrap">
        <SearchForm />
      </div>

      <section className="container bm-intro-strip" aria-label="Marketplace sections">
        {focusAreas.map((item) => (
          <Link className="bm-focus-link" href={item.href} key={item.title}>
            <MarineIcon name={item.icon} />
            <span>{item.title}</span>
            <em>{item.text}</em>
          </Link>
        ))}
      </section>

      <section className="container bm-section bm-fleet-section">
        <div className="bm-section-head">
          <div>
            <span className="bm-kicker">Curated brokerage</span>
            <h2>Featured boats</h2>
          </div>
          <p>High-impact listing cards designed around photography, clear pricing and fast enquiry behaviour.</p>
          <Link href="/boats">View all boats</Link>
        </div>
        <div className="bm-listing-grid">
          {boats.map((boat: Boat) => <BoatCard boat={boat} key={boat.id} />)}
        </div>
      </section>

      <section className="bm-editorial-band">
        <div className="container bm-editorial-grid">
          <div className="bm-editorial-copy">
            <span className="bm-kicker">Beyond boat adverts</span>
            <h2>Turn the marketplace into the marine industry's front door.</h2>
            <p>The strongest platform is not just a classified board. It captures buyers earlier: when they are buying kit, booking engineers, comparing marinas or planning a refit.</p>
            <Link className="bm-secondary bm-secondary-light" href="/services">Explore services</Link>
          </div>
          <div className="bm-service-deck">
            {marineServices.slice(0, 4).map((service) => <ServiceCard service={service} key={service.id} />)}
          </div>
        </div>
      </section>

      <section className="container bm-market-grid">
        <div className="bm-market-card bm-products-card">
          <div className="bm-card-head">
            <span className="bm-kicker">Chandlery</span>
            <Link href="/chandlery">View products</Link>
          </div>
          <h2>Marine gear that belongs beside the boat search.</h2>
          <div className="bm-product-row">
            {chandleryProducts.slice(0, 3).map((product) => <ProductCard product={product} key={product.id} />)}
          </div>
        </div>

        <div className="bm-market-card bm-marina-card">
          <div className="bm-card-head">
            <span className="bm-kicker">Marinas</span>
            <Link href="/marinas">View berths</Link>
          </div>
          <h2>Berths, yards and seasonal storage.</h2>
          <div className="bm-marina-photo" style={{ backgroundImage: `url(${marinaListings[0].image_url})` }} />
          <div className="bm-berth-list">
            {marinaListings.slice(0, 3).map((marina) => (
              <Link href="/marinas" key={marina.id}>
                <strong>{marina.name}</strong>
                <span>{marina.location}</span>
                <em>{marina.price_note}</em>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container bm-proof-strip">
        <div><strong>12,000+</strong><span>marketplace listings</span></div>
        <div><strong>1,200+</strong><span>verified brokers</span></div>
        <div><strong>24/7</strong><span>lead capture</span></div>
        <div><strong>150+</strong><span>countries covered</span></div>
      </section>

      <section className="container bm-seller-panel">
        <div>
          <span className="bm-kicker">For brokers and private sellers</span>
          <h2>List beautifully. Capture better leads. Sell with confidence.</h2>
          <p>A premium front end for a serious marketplace: stronger visual trust, better mobile search and a cleaner route from advert to enquiry.</p>
        </div>
        <div className="bm-seller-actions">
          <Link className="bm-primary" href="/sell">List your boat</Link>
          <Link className="bm-secondary bm-secondary-light" href="/pricing">Broker plans</Link>
        </div>
      </section>
    </main>
  );
}
