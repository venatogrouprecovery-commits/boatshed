import { ServiceCard } from '@/components/MarketplaceCards';
import { marineServices } from '@/lib/demo-data';

export default function ServicesPage() {
  const categories = Array.from(new Set(marineServices.map((item) => item.category)));
  return (
    <main className="subpage">
      <section className="subpage-hero services-hero">
        <span className="section-kicker">Marine service directory</span>
        <h1>Find engineers, surveyors, upholsterers and refit specialists.</h1>
        <p>Premium service adverts designed for quote requests, broker referrals and serious ownership enquiries.</p>
        <div className="subpage-search">
          <input placeholder="Search service, provider or location..." />
          <button>Find services</button>
        </div>
      </section>

      <section className="subpage-section">
        <div className="filter-pills">
          {categories.map((category) => <span key={category}>{category}</span>)}
        </div>
        <div className="service-directory-grid">
          {marineServices.map((service) => <ServiceCard service={service} key={service.id} />)}
        </div>
      </section>
    </main>
  );
}
