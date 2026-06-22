import Link from 'next/link';
import { createClient, hasSupabaseConfig } from '@/lib/supabase-server';
import { BoatCard } from '@/components/BoatCard';
import { ProductCard, ServiceCard } from '@/components/MarketplaceCards';
import { SearchForm } from '@/components/SearchForm';
import { Boat } from '@/types/database';
import { chandleryProducts, demoBoats, marinaListings, marineServices } from '@/lib/demo-data';
import { MarineIcon, YachtHeroArt } from '@/components/MarineIcons';

const categories = [
  { title: 'Boats', text: 'Sail, power, classic and liveaboard listings.', href: '/boats', icon: 'boat' as const },
  { title: 'Chandlery', text: 'Parts, electronics, safety kit and refit gear.', href: '/chandlery', icon: 'chandlery' as const },
  { title: 'Services', text: 'Engineers, upholstery, surveys and transport.', href: '/services', icon: 'services' as const },
  { title: 'Marinas', text: 'Berths, yards, lift-outs and winter storage.', href: '/marinas', icon: 'marina' as const }
];

const trust = [
  ['12,000+', 'active listings', 'boat'],
  ['1,200+', 'verified brokers', 'broker'],
  ['24/7', 'enquiry capture', 'support'],
  ['150+', 'countries covered', 'globe'],
  ['Secure', 'seller controls', 'shield']
] as const;

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

  return (
    <main className="home-page">
      <section className="premium-hero">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><span /> The next generation Boatshed experience</span>
            <h1>Buy, sell and explore the marine world.</h1>
            <p>Boatshed Marketplace brings boats, chandlery, marine services and marina offers into one elegant platform for serious buyers, sellers and brokers.</p>
            <div className="hero-actions">
              <Link className="primary-cta" href="/boats">Browse boats</Link>
              <Link className="secondary-cta" href="/sell">List your boat</Link>
            </div>
          </div>
          <div className="hero-art-wrap">
            <YachtHeroArt />
            <div className="floating-card vessel-card">
              <span className="mini-label">Featured</span>
              <strong>Princess F45</strong>
              <em>£649,000 · Miami</em>
            </div>
            <div className="floating-card broker-card">
              <MarineIcon name="shield" />
              <span>Verified broker network</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container search-anchor"><SearchForm /></div>

      <section className="container category-sweep">
        {categories.map((item) => (
          <Link href={item.href} className="category-pill" key={item.title}>
            <span className="icon-bubble"><MarineIcon name={item.icon} /></span>
            <strong>{item.title}</strong>
            <small>{item.text}</small>
          </Link>
        ))}
      </section>

      <section className="container section-block">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Curated listings</span>
            <h2>Featured boats</h2>
            <p>Polished listing cards with strong imagery, quick specs and clear broker-ready calls to action.</p>
          </div>
          <Link href="/boats" className="text-arrow">View all boats →</Link>
        </div>
        <div className="listing-grid">
          {boats.map((boat: Boat) => <BoatCard boat={boat} key={boat.id} />)}
        </div>
      </section>

      <section className="service-ribbon">
        <div className="container">
          <div className="section-heading light-heading">
            <div>
              <span className="section-kicker">Trusted suppliers</span>
              <h2>Everything around the boat, not just the boat.</h2>
              <p>Services, products and berths make the marketplace useful even before a buyer is ready to purchase.</p>
            </div>
            <Link href="/services" className="text-arrow light">Explore services →</Link>
          </div>
          <div className="service-grid">
            {marineServices.slice(0, 4).map((service) => <ServiceCard service={service} key={service.id} />)}
          </div>
        </div>
      </section>

      <section className="container split-market section-block">
        <div className="market-panel chandlery-panel">
          <div className="panel-heading">
            <span className="section-kicker">Chandlery</span>
            <h2>Premium gear and marine essentials.</h2>
          </div>
          <div className="product-strip">
            {chandleryProducts.slice(0, 3).map((product) => <ProductCard product={product} key={product.id} />)}
          </div>
        </div>
        <div className="market-panel marina-panel">
          <div className="panel-heading">
            <span className="section-kicker">Marinas & berths</span>
            <h2>Berth offers with a smarter visual map feel.</h2>
          </div>
          <div className="mini-map" aria-hidden="true">
            <span className="pin p1" /><span className="pin p2" /><span className="pin p3" />
            <svg viewBox="0 0 420 210"><path d="M0 80c70-60 126-50 185-20 65 32 114 26 235-35v185H0Z" fill="#bcecff"/><path d="M0 146c71-13 123-7 156 18 48 36 112 34 264-23v69H0Z" fill="#0b6fae" opacity=".65"/><path d="M56 0h145L70 210H0V90Z" fill="#d9f2db"/><path d="M230 0h190v70c-80 32-145 34-207 8Z" fill="#e8f5dc"/><path d="M20 75h140M80 0v205M205 20l-70 170M260 20l110 130" stroke="#fff" strokeWidth="8" opacity=".9"/></svg>
          </div>
          <div className="berth-list">
            {marinaListings.slice(0, 3).map((marina) => (
              <Link href="/marinas" key={marina.id}>
                <strong>{marina.name}</strong>
                <small>{marina.location}</small>
                <em>{marina.price_note}</em>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container trust-strip">
        {trust.map(([value, label, icon]) => (
          <div className="trust-item" key={label}>
            <MarineIcon name={icon as any} />
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="container seller-cta">
        <div className="cta-emblem"><MarineIcon name="sell" /></div>
        <div>
          <span className="section-kicker">For sellers and brokers</span>
          <h2>Sell your boat. Reach more serious buyers.</h2>
          <p>Turn the Boatshed broker network into a modern global marketplace with cleaner adverts, better lead capture and stronger supplier opportunities.</p>
        </div>
        <div className="cta-buttons">
          <Link href="/sell" className="primary-cta">List your boat</Link>
          <Link href="/pricing" className="secondary-cta dark">Broker plans</Link>
        </div>
      </section>
    </main>
  );
}
