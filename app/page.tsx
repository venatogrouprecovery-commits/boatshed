import Link from 'next/link';
import { createClient, hasSupabaseConfig } from '@/lib/supabase-server';
import { BoatCard } from '@/components/BoatCard';
import { ProductCard, ServiceCard, MarinaCard } from '@/components/MarketplaceCards';
import { SearchForm } from '@/components/SearchForm';
import { Boat } from '@/types/database';
import {
  chandleryProducts,
  demoBoats,
  marinaListings,
  marineGuides,
  marineServices,
  marketplaceOffers,
  videoGuides,
  boatReviews,
  brandLogos
} from '@/lib/demo-data';
import { BoatshedLogo, PremiumIcon } from '@/components/PremiumIcons';
import { currencyGBP } from '@/lib/format';

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

const activity = [
  { title: 'New Princess listing', detail: 'Princess 388 added in Cowes', time: '12 mins ago' },
  { title: 'Service quote requested', detail: 'Engine survey · Hamble', time: '31 mins ago' },
  { title: 'Chandlery order', detail: 'Victron charger reserved', time: '1 hour ago' },
  { title: 'Berth enquiry', detail: '45ft annual berth · IoW', time: '2 hours ago' }
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
        .limit(8);
      liveBoats = data as Boat[] | null;
    } catch {
      liveBoats = null;
    }
  }

  const boats = (liveBoats?.length ? liveBoats : demoBoats.slice(0, 8)) as Boat[];
  const leadBoat = boats[0];

  return (
    <main>
      <section className="concept-hero marketplace-hero">
        <div className="hero-shell">
          <div className="hero-topline">
            <span>International yacht brokers</span>
            <span>Boats · Chandlery · Services · Marinas · Advice</span>
          </div>
          <div className="hero-photo">
            <div className="hero-copy">
              <span className="eyebrow hero-eyebrow">Boatshed Marketplace</span>
              <h1>Find your next boat with confidence</h1>
              <p>The premium marine marketplace for boats, broker stock, services, chandlery, berths, reviews and practical ownership advice.</p>
              <div className="hero-proof-row">
                <span>12,000+ active adverts</span>
                <span>1,200+ verified brokers</span>
                <span>24/7 enquiry routing</span>
              </div>
            </div>
            <aside className="live-market-card" aria-label="Live marketplace activity">
              <div className="live-market-head">
                <span className="live-dot" />
                <strong>Live marketplace</strong>
              </div>
              {activity.map((item) => (
                <div className="activity-row" key={item.title}>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </div>
                  <em>{item.time}</em>
                </div>
              ))}
            </aside>
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

      <section className="brand-showcase" aria-label="Featured marine brands">
        <div className="brand-showcase-head">
          <span className="section-kicker">Brands across the marketplace</span>
          <h2>Search boats, equipment and services from names buyers recognise.</h2>
          <p>Logo placements shown for demo authenticity. Final launch should use approved brand assets and supplier permissions.</p>
        </div>
        <div className="brand-logo-rail">
          {brandLogos.slice(0, 12).map((brand) => (
            <article className="brand-logo-card" key={brand.name}>
              <img src={brand.logo_url} alt={`${brand.name} logo`} />
              <span>{brand.name}</span>
              <em>{brand.category}</em>
            </article>
          ))}
        </div>
      </section>

      <section className="section featured-boats-section">
        <div className="section-heading concept-heading">
          <div>
            <span className="section-kicker">New and featured inventory</span>
            <h2>Featured Boats</h2>
            <p>Handpicked quality boats from brokers, dealers and private sellers across the network.</p>
          </div>
          <Link href="/boats" className="text-arrow">View all boats <PremiumIcon name="arrow" /></Link>
        </div>
        <div className="feature-layout">
          {leadBoat && <BoatCard boat={leadBoat} priority />}
          <div className="concept-listings-grid compact-feature-grid">
            {boats.slice(1, 7).map((boat) => (
              <BoatCard boat={boat} key={boat.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="section offers-section">
        <div className="section-heading concept-heading">
          <div>
            <span className="section-kicker">Marketplace offers</span>
            <h2>Deals, upgrades and limited-time adverts</h2>
            <p>Show the site is active with rotating commercial placements from chandlers, marinas, service providers and brokers.</p>
          </div>
          <Link href="/chandlery" className="text-arrow">View marketplace <PremiumIcon name="arrow" /></Link>
        </div>
        <div className="offer-grid">
          {marketplaceOffers.map((offer) => (
            <article className="offer-card" key={offer.id}>
              <img src={offer.image_url} alt={offer.title} />
              <div>
                <span>{offer.type}</span>
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
                <footer>
                  <strong>{offer.price_note}</strong>
                  <Link href={offer.href}>View advert</Link>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section explore-section">
        <div className="section-heading concept-heading">
          <div>
            <span className="section-kicker">Browse the fleet</span>
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

      <section className="marketplace-expansion marketplace-deep-section">
        <div className="marketplace-copy">
          <span className="eyebrow">Beyond boat adverts</span>
          <h2>A marine marketplace that looks alive.</h2>
          <p>Boats remain the hero product, but buyers also need refit suppliers, marina options, safety gear, transport, surveys, electronics and ownership advice.</p>
          <div className="marketplace-mini-stats">
            <span><strong>430+</strong> chandlery adverts</span>
            <span><strong>180+</strong> service providers</span>
            <span><strong>72</strong> berth offers</span>
          </div>
        </div>
        <div className="marketplace-panels wider-panels">
          <div className="mini-panel tall-panel">
            <div className="mini-panel-head"><PremiumIcon name="tools" /><span>Service adverts</span></div>
            {marineServices.slice(0, 3).map((service) => <ServiceCard service={service} key={service.id} />)}
          </div>
          <div className="mini-panel tall-panel">
            <div className="mini-panel-head"><PremiumIcon name="box" /><span>Chandlery deals</span></div>
            {chandleryProducts.slice(0, 4).map((product) => <ProductCard product={product} key={product.id} />)}
          </div>
          <div className="mini-panel tall-panel marina-mini">
            <div className="mini-panel-head"><PremiumIcon name="marina" /><span>Marinas & Berths</span></div>
            <div className="concept-map"><PremiumIcon name="pin" /><i /><b /></div>
            {marinaListings.slice(0, 3).map((marina) => <MarinaCard marina={marina} key={marina.id} />)}
          </div>
        </div>
      </section>

      <section className="section media-section">
        <div className="section-heading concept-heading">
          <div>
            <span className="section-kicker">Watch, read and compare</span>
            <h2>How-to videos and boat reviews</h2>
            <p>Useful editorial content makes the marketplace feel active and gives buyers a reason to return.</p>
          </div>
          <Link href="/advice" className="text-arrow">View advice hub <PremiumIcon name="arrow" /></Link>
        </div>
        <div className="media-layout">
          <div className="video-grid">
            {videoGuides.map((video) => (
              <article className="video-card" key={video.id}>
                <img src={video.image_url} alt={video.title} />
                <div className="play-badge">▶</div>
                <div className="video-copy">
                  <span>{video.duration} · {video.category}</span>
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="review-stack">
            <h3>Latest reviews</h3>
            {boatReviews.map((review) => (
              <article className="review-card" key={review.id}>
                <img src={review.image_url} alt={review.title} />
                <div>
                  <span>{review.type}</span>
                  <h4>{review.title}</h4>
                  <p>{review.summary}</p>
                  <Link href="/advice">Read review</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section guide-section">
        <div className="section-heading concept-heading">
          <div>
            <span className="section-kicker">Guides and ownership advice</span>
            <h2>Everything around the boat purchase</h2>
            <p>Practical guides, cost explainers and ownership content help the marketplace feel credible, useful and less like a static advert board.</p>
          </div>
        </div>
        <div className="guide-grid">
          {marineGuides.map((guide) => (
            <article className="guide-card" key={guide.id}>
              <span>{guide.category}</span>
              <h3>{guide.title}</h3>
              <p>{guide.summary}</p>
              <Link href="/advice">Read guide</Link>
            </article>
          ))}
        </div>
      </section>



      <section className="section brand-directory-section">
        <div className="section-heading concept-heading">
          <div>
            <span className="section-kicker">Brand marketplace</span>
            <h2>Boats, engines, electronics, safety and chandlery.</h2>
            <p>Use recognisable marine names to make the marketplace feel stocked, commercial and credible from day one.</p>
          </div>
          <Link href="/chandlery" className="text-arrow">Browse suppliers <PremiumIcon name="arrow" /></Link>
        </div>
        <div className="brand-directory-grid">
          {brandLogos.map((brand) => (
            <article className="brand-directory-card" key={brand.name}>
              <div className="brand-directory-logo"><img src={brand.logo_url} alt={`${brand.name} logo`} /></div>
              <div>
                <strong>{brand.name}</strong>
                <span>{brand.category}</span>
              </div>
            </article>
          ))}
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
          <span className="eyebrow">For sellers, brokers and marine businesses</span>
          <h2>List once. Reach serious marine buyers.</h2>
          <p>A premium front door for stock, services, offers and enquiries — built for credibility, not classified-site clutter.</p>
        </div>
        <div className="cta-actions">
          <Link href="/sell" className="button button-gold">List your boat</Link>
          <Link href="/pricing" className="button button-outline-light">Broker plans</Link>
        </div>
      </section>
    </main>
  );
}
