import Link from 'next/link';
import { createClient, hasSupabaseConfig } from '@/lib/supabase-server';
import { BoatCard } from '@/components/BoatCard';
import { ProductCard, ServiceCard, MarinaCard } from '@/components/MarketplaceCards';
import { SearchForm } from '@/components/SearchForm';
import { Boat } from '@/types/database';
import { chandleryProducts, demoBoats, marinaListings, marineServices } from '@/lib/demo-data';
import { BoatshedLogo, PremiumIcon } from '@/components/PremiumIcons';

const trustItems = [
  { icon: 'broker' as const, title: 'Broker inspected', text: 'Quality checked' },
  { icon: 'shield' as const, title: 'Survey available', text: 'Full transparency' },
  { icon: 'box' as const, title: 'Finance checked', text: 'Secure & verified' },
  { icon: 'camera' as const, title: 'Video tour', text: 'See more remotely' }
];

const categories = [
  { icon: 'anchor' as const, title: 'Sailboats', count: '1,842 boats', href: '/boats' },
  { icon: 'engine' as const, title: 'Motor Yachts', count: '1,256 boats', href: '/boats' },
  { icon: 'marina' as const, title: 'Liveaboards', count: '632 boats', href: '/boats' },
  { icon: 'tools' as const, title: 'Project Boats', count: '216 boats', href: '/boats' }
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

  return (
    <main>
      <section className="concept-hero">
        <div className="hero-shell">
          <div className="hero-topline">
            <span>International yacht brokers</span>
            <span>Marketplace · Brokerage · Services</span>
          </div>
          <div className="hero-photo">
            <div className="hero-copy">
              <span className="eyebrow hero-eyebrow">Boatshed Marketplace</span>
              <h1>Find your next boat with confidence</h1>
              <p>The world’s trusted marketplace for buying and selling quality boats, backed by broker expertise and detailed listings.</p>
            </div>
            <div className="hero-mobile-card" aria-hidden="true">
              <div className="phone-top"><BoatshedLogo compact /><PremiumIcon name="heart" /></div>
              <h3>Find your next boat with confidence</h3>
              <div className="phone-search-lines"><span /><span /><span /><span /></div>
            </div>
          </div>
          <div className="hero-search-wrap">
            <SearchForm />
          </div>
          <div className="confidence-strip">
            {trustItems.map((item) => (
              <div key={item.title}>
                <PremiumIcon name={item.icon} />
                <span><strong>{item.title}</strong><em>{item.text}</em></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section featured-boats-section">
        <div className="section-heading concept-heading">
          <div>
            <h2>Featured Boats</h2>
            <p>Handpicked quality boats from our global network.</p>
          </div>
          <Link href="/boats" className="text-arrow">View all boats <PremiumIcon name="arrow" /></Link>
        </div>
        <div className="concept-listings-grid">
          {boats.slice(0, 4).map((boat, index) => (
            <BoatCard boat={boat} priority={index === 0} key={boat.id} />
          ))}
        </div>
      </section>

      <section className="section explore-section">
        <div className="section-heading concept-heading">
          <div>
            <h2>Explore by Category</h2>
            <p>Start with the right market segment, then refine by price, location and specification.</p>
          </div>
          <Link href="/boats" className="text-arrow">View all categories <PremiumIcon name="arrow" /></Link>
        </div>
        <div className="category-pill-grid">
          {categories.map((category) => (
            <Link href={category.href} className="category-pill" key={category.title}>
              <PremiumIcon name={category.icon} />
              <span><strong>{category.title}</strong><em>{category.count}</em></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="marketplace-expansion">
        <div className="marketplace-copy">
          <span className="eyebrow">Beyond brokerage</span>
          <h2>Chandlery, services and berths — integrated without clutter.</h2>
          <p>Boats remain the hero product. The wider marine marketplace supports the buyer journey with equipment, engineering, transport and marina options.</p>
        </div>
        <div className="marketplace-panels">
          <div className="mini-panel">
            <div className="mini-panel-head"><PremiumIcon name="tools" /><span>Marine Services</span></div>
            {marineServices.slice(0, 2).map((service) => <ServiceCard service={service} key={service.id} />)}
          </div>
          <div className="mini-panel">
            <div className="mini-panel-head"><PremiumIcon name="box" /><span>Chandlery Highlights</span></div>
            {chandleryProducts.slice(0, 2).map((product) => <ProductCard product={product} key={product.id} />)}
          </div>
          <div className="mini-panel marina-mini">
            <div className="mini-panel-head"><PremiumIcon name="marina" /><span>Marinas & Berths</span></div>
            <div className="concept-map"><PremiumIcon name="pin" /><i /><b /></div>
            {marinaListings.slice(0, 1).map((marina) => <MarinaCard marina={marina} key={marina.id} />)}
          </div>
        </div>
      </section>

      <section className="stats-band">
        <div><PremiumIcon name="shield" /><strong>30+ Years</strong><span>of experience</span></div>
        <div><PremiumIcon name="anchor" /><strong>25,000+</strong><span>boats sold</span></div>
        <div><PremiumIcon name="globe" /><strong>120+</strong><span>countries covered</span></div>
        <div><PremiumIcon name="star" /><strong>5★ Service</strong><span>rated by clients</span></div>
      </section>

      <section className="seller-cta concept-cta">
        <div>
          <span className="eyebrow">For sellers and brokers</span>
          <h2>List once. Reach serious marine buyers.</h2>
          <p>A premium front door for stock, services and enquiries — built for credibility, not classified-site clutter.</p>
        </div>
        <div className="cta-actions">
          <Link href="/sell" className="button button-gold">List your boat</Link>
          <Link href="/pricing" className="button button-outline-light">Broker plans</Link>
        </div>
      </section>
    </main>
  );
}
