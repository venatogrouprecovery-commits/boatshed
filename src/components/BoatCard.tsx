import Link from 'next/link';
import { Boat } from '@/types/database';
import { currencyGBP } from '@/lib/format';

export function BoatCard({ boat }: { boat: Boat }) {
  return (
    <article className="bm-boat-card">
      <Link href={`/boats/${boat.id}`} className="bm-boat-image" aria-label={`View ${boat.title}`}>
        <img src={boat.main_image_url || 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80'} alt={boat.title} />
        {boat.featured && <span>Featured</span>}
      </Link>
      <div className="bm-boat-content">
        <div className="bm-boat-title-row">
          <h3>{boat.title}</h3>
          <strong>{currencyGBP(boat.price_gbp)}</strong>
        </div>
        <p>{boat.location}</p>
        <div className="bm-boat-meta">
          <span>{boat.year || 'Year TBC'}</span>
          <span>{boat.length_ft || '?'} ft</span>
          <span>{boat.category}</span>
          {boat.fuel_type && <span>{boat.fuel_type}</span>}
        </div>
        <Link href={`/boats/${boat.id}`} className="bm-card-link">View listing</Link>
      </div>
    </article>
  );
}
