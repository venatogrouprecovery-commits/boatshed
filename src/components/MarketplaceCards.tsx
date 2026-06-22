import Link from 'next/link';
import { currencyGBP } from '@/lib/format';
import { ChandleryProduct, MarineService, MarinaListing } from '@/lib/demo-data';

export function ProductCard({ product }: { product: ChandleryProduct }) {
  return (
    <div className="card marketplace-card h-100 border-0 shadow-sm">
      <img src={product.image_url} className="card-img-top" alt={product.name} />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between gap-2 align-items-start">
          <h5 className="card-title mb-1">{product.name}</h5>
          <span className="badge text-bg-light border">{product.condition}</span>
        </div>
        <p className="text-muted small mb-2">{product.category} • {product.location}</p>
        <p className="fw-semibold mb-2">{product.vendor}</p>
        <p className="text-muted small flex-grow-1">{product.description}</p>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <strong className="text-primary fs-5">{currencyGBP(product.price_gbp)}</strong>
          <Link href="/chandlery" className="btn btn-outline-primary btn-sm">View item</Link>
        </div>
      </div>
    </div>
  );
}

export function ServiceCard({ service }: { service: MarineService }) {
  return (
    <div className="card marketplace-card h-100 border-0 shadow-sm">
      <img src={service.image_url} className="card-img-top" alt={service.name} />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <h5 className="card-title mb-1">{service.name}</h5>
          <span className="badge text-bg-warning">★ {service.rating}</span>
        </div>
        <p className="text-muted small mb-2">{service.category} • {service.area}</p>
        <p className="small text-success fw-semibold">{service.response}</p>
        <p className="text-muted small flex-grow-1">{service.description}</p>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {service.services.map((item) => <span key={item} className="badge badge-soft">{item}</span>)}
        </div>
        <Link href="/services" className="btn btn-outline-primary mt-auto">Request quote</Link>
      </div>
    </div>
  );
}

export function MarinaCard({ marina }: { marina: MarinaListing }) {
  return (
    <div className="card marketplace-card h-100 border-0 shadow-sm">
      <img src={marina.image_url} className="card-img-top" alt={marina.name} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-1">{marina.name}</h5>
        <p className="text-muted small mb-2">{marina.location} • {marina.berth_size}</p>
        <p className="fw-semibold">{marina.price_note}</p>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {marina.facilities.map((item) => <span key={item} className="badge badge-soft">{item}</span>)}
        </div>
        <Link href="/marinas" className="btn btn-outline-primary mt-auto">Check availability</Link>
      </div>
    </div>
  );
}
