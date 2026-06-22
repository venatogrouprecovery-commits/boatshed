import Link from 'next/link';
import { createClient, hasSupabaseConfig } from '@/lib/supabase-server';
import { BoatCard } from '@/components/BoatCard';
import { ProductCard, ServiceCard, MarinaCard } from '@/components/MarketplaceCards';
import { SearchForm } from '@/components/SearchForm';
import { Boat } from '@/types/database';
import { chandleryProducts, demoBoats, marinaListings, marineServices } from '@/lib/demo-data';
import { PremiumIcon } from '@/components/PremiumIcons';

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
    <main>
      <section className="hero-premium">
        <div className="hero-media" />
        <div className="hero-shade" />
        <div className="hero-content">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow">Boatshed Marketplace · premium marine search</span>
            <h1>Buy, sell and source everything marine.</h1>
            <p>One marketplace for serious boat buyers, brokers, suppliers, yards, engineers, chandlery and marina opportunities.</p>
            <div className="hero-links">
              <Link href="/boats" className="button button-orange">Browse boats</Link>
              <Link href="/sell" className="button button-glass">Advertise now</Link>
            </div>
          </div>
          <aside className="hero-feature-card" aria-label="Featured marketplace highlight">
            <span>Featured listing</span>
            <strong>{leadBoat?.title || 'Princess F45'}</strong>
            <p>{leadBoat?.location || 'South Coast, UK'} · {leadBoat?.length_ft || 45} ft · {leadBoat?.category || 'Motor yacht'}</p>
          </aside>
        </div>
      </section>

      <section className="search-overlap">
        <SearchForm />
      </section>

      <section className="section editorial-intro">
        <div className="section-kicker">Marketplace scope</div>
        <div className="editorial-grid">
          <div>
            <h2>Built around the way marine buyers actually search.</h2>
            <p>Boatshed Marketplace should feel like a premium brokerage environment first, then open out into chandlery, services and berths without becoming a cluttered directory.</p>
          </div>
          <div className="proof-strip">
            <div><strong>12k+</strong><span>active listings vision</span></div>
            <div><strong>24/7</strong><span>enquiry capture</span></div>
            <div><strong>4</strong><span>revenue channels</span></div>
          </div>
        </div>
      </section>

      <section className="section featured-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Curated search</span>
            <h2>Featured boats</h2>
          </div>
          <Link href="/boats" className="text-arrow">View all boats <PremiumIcon name="arrow" /></Link>
        </div>
        <div className="listings-grid">
          {boats.slice(0, 3).map((boat, index) => (
            <BoatCard boat={boat} priority={index === 0} key={boat.id} />
          ))}
        </div>
      </section>

      <section className="section category-editorial">
        <div className="category-hero">
          <span className="section-kicker">Beyond listings</span>
          <h2>More than a boat advert site.</h2>
          <p>Give every marine business a place in the buyer journey: stock, services, parts, marinas and broker-led sale support.</p>
          <Link href="/pricing" className="button button-dark">Broker packages</Link>
        </div>
        <div className="category-stack">
          <Link href="/boats" className="category-row"><PremiumIcon name="anchor" /><span><strong>Boats</strong><em>Broker and private listings</em></span></Link>
          <Link href="/chandlery" className="category-row"><PremiumIcon name="box" /><span><strong>Chandlery</strong><em>Equipment, electronics, spares</em></span></Link>
          <Link href="/services" className="category-row"><PremiumIcon name="tools" /><span><strong>Services</strong><em>Engineering, transport, refit</em></span></Link>
          <Link href="/marinas" className="category-row"><PremiumIcon name="marina" /><span><strong>Marinas</strong><em>Berths, yards and storage</em></span></Link>
        </div>
      </section>

      <section className="section dark-service-band">
        <div className="section-heading section-heading-on-dark">
          <div>
            <span className="section-kicker">Vetted capability</span>
            <h2>Marine services that support the sale.</h2>
          </div>
          <Link href="/services" className="text-arrow text-arrow-light">View services <PremiumIcon name="arrow" /></Link>
        </div>
        <div className="services-grid">
          {marineServices.slice(0, 3).map((service) => <ServiceCard service={service} key={service.id} />)}
        </div>
      </section>

      <section className="section split-market">
        <div>
          <div className="section-heading compact-heading">
            <div>
              <span className="section-kicker">Chandlery</span>
              <h2>Essential kit, without burying the boat search.</h2>
            </div>
          </div>
          <div className="product-grid">
            {chandleryProducts.slice(0, 3).map((product) => <ProductCard product={product} key={product.id} />)}
          </div>
        </div>
        <div className="marina-feature">
          <div className="marina-map"><PremiumIcon name="pin" /><span>Solent</span><i /><b /></div>
          {marinaListings.slice(0, 2).map((marina) => <MarinaCard marina={marina} key={marina.id} />)}
        </div>
      </section>

      <section className="seller-cta">
        <div>
          <span className="section-kicker">For sellers and brokers</span>
          <h2>List once. Reach serious marine buyers.</h2>
          <p>Use the marketplace as a cleaner front door for stock, services and enquiries while keeping the buyer experience premium.</p>
        </div>
        <div className="cta-actions">
          <Link href="/sell" className="button button-orange">List your boat</Link>
          <Link href="/pricing" className="button button-glass-dark">Broker plans</Link>
        </div>
      </section>
    </main>
  );
}
