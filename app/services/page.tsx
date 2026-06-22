import { ServiceCard } from '@/components/MarketplaceCards';
import { marineServices } from '@/lib/demo-data';

export default function ServicesPage() {
  const categories = Array.from(new Set(marineServices.map((item) => item.category)));
  return (
    <main className="container py-5">
      <div className="row align-items-end gy-3 mb-4">
        <div className="col-lg-8">
          <span className="badge text-bg-primary mb-2">Demo service directory</span>
          <h1 className="fw-bold">Marine services</h1>
          <p className="text-muted mb-0">Engineers, upholsterers, surveyors, electronics specialists, transport providers and refit teams.</p>
        </div>
        <div className="col-lg-4">
          <div className="input-group">
            <input className="form-control" placeholder="Search service or area" />
            <button className="btn btn-primary">Search</button>
          </div>
        </div>
      </div>
      <div className="d-flex flex-wrap gap-2 mb-4">
        {categories.map((category) => <span key={category} className="badge rounded-pill text-bg-light border px-3 py-2">{category}</span>)}
      </div>
      <div className="row g-4">
        {marineServices.map((service) => (
          <div className="col-12 col-md-6 col-xl-4" key={service.id}><ServiceCard service={service} /></div>
        ))}
      </div>
    </main>
  );
}
