import { ProductCard } from '@/components/MarketplaceCards';
import { brandLogos, chandleryProducts } from '@/lib/demo-data';

export default function ChandleryPage() {
  const categories = Array.from(new Set(chandleryProducts.map((item) => item.category)));
  const chandleryBrands = brandLogos.filter((brand) => ['Chandlery', 'Safety', 'Life jackets', 'Clothing', 'Deck gear', 'Power', 'Electronics'].includes(brand.category));
  return (
    <main className="subpage">
      <section className="subpage-hero chandlery-hero">
        <span className="section-kicker">Chandlery marketplace</span>
        <h1>Gear, electronics, safety kit and upgrade deals.</h1>
        <p>Demo commercial adverts for trusted chandlers, equipment suppliers and marine brands. Built to feel stocked before live sellers are onboarded.</p>
        <div className="subpage-search">
          <input placeholder="Search life jackets, electronics, ropes, chargers..." />
          <button>Search chandlery</button>
        </div>
      </section>

      <section className="subpage-section">
        <div className="filter-pills">
          {categories.map((category) => <span key={category}>{category}</span>)}
        </div>
        <div className="product-market-grid">
          {chandleryProducts.map((product) => <ProductCard product={product} key={product.id} />)}
        </div>
      </section>

      <section className="subpage-section supplier-strip-section">
        <div className="section-heading concept-heading">
          <div>
            <span className="section-kicker">Featured suppliers</span>
            <h2>Recognisable chandlery and equipment brands.</h2>
            <p>Temporary demo logo placements for authenticity. Swap for approved official assets before public launch.</p>
          </div>
        </div>
        <div className="brand-directory-grid compact-brands">
          {chandleryBrands.map((brand) => (
            <article className="brand-directory-card" key={brand.name}>
              <div className="brand-directory-logo"><img src={brand.logo_url} alt={`${brand.name} logo`} /></div>
              <div><strong>{brand.name}</strong><span>{brand.category}</span></div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
