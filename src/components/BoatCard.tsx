import Link from 'next/link';
import { Boat } from '@/types/database';
import { currencyGBP } from '@/lib/format';

export function BoatCard({ boat }: { boat: Boat }) {
  return (
    <div className="card boat-card h-100 border-0 shadow-sm">
      <img src={boat.main_image_url || 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=900&q=80'} className="card-img-top" alt={boat.title} />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <h5 className="card-title mb-1">{boat.title}</h5>
          {boat.featured && <span className="badge text-bg-warning">Featured</span>}
        </div>
        <p className="text-muted small mb-2">{boat.location} • {boat.year || 'Year TBC'} • {boat.length_ft || '?'} ft</p>
        <p className="fs-5 fw-bold text-primary mb-3">{currencyGBP(boat.price_gbp)}</p>
        <div className="d-flex flex-wrap gap-2 mb-3 small">
          <span className="badge badge-soft">{boat.category}</span>
          {boat.fuel_type && <span className="badge badge-soft">{boat.fuel_type}</span>}
        </div>
        <Link href={`/boats/${boat.id}`} className="btn btn-outline-primary mt-auto">View listing</Link>
      </div>
    </div>
  );
}
