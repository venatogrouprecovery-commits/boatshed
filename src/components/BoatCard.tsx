import Link from 'next/link';
import { Boat } from '@/types/database';
import { currencyGBP } from '@/lib/format';

export function BoatCard({ boat }: { boat: Boat }) {
  return (
    <article className="listing-card">
      <Link href={`/boats/${boat.id}`} className="listing-media" aria-label={`View ${boat.title}`}>
        <img src={boat.main_image_url || 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=900&q=80'} alt={boat.title} />
        {boat.featured && <span className="listing-flag">Featured</span>}
        <span className="heart-dot">♡</span>
      </Link>
      <div className="listing-body">
        <div className="listing-title-row">
          <h3>{boat.title}</h3>
          <strong>{currencyGBP(boat.price_gbp)}</strong>
        </div>
        <p>{boat.location} · {boat.year || 'Year TBC'} · {boat.length_ft || '?'} ft</p>
        <div className="spec-row">
          <span>{boat.category}</span>
          {boat.fuel_type && <span>{boat.fuel_type}</span>}
          <span>{boat.seller_type || 'Broker'}</span>
        </div>
        <Link href={`/boats/${boat.id}`} className="card-link-arrow">View listing →</Link>
      </div>
    </article>
  );
}
