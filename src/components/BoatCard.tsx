import Link from 'next/link';
import { Boat } from '@/types/database';
import { currencyGBP } from '@/lib/format';
import { PremiumIcon } from './PremiumIcons';

const fallbackImage = 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=82';

export function BoatCard({ boat, priority = false }: { boat: Boat; priority?: boolean }) {
  return (
    <article className={`listing-card ${priority ? 'listing-card-featured' : ''}`}>
      <Link href={`/boats/${boat.id}`} className="listing-card-image" aria-label={`View ${boat.title}`}>
        <img src={boat.main_image_url || fallbackImage} alt={boat.title} />
        {boat.featured && <span className="listing-chip">Featured</span>}
      </Link>
      <div className="listing-card-body">
        <div className="listing-location"><PremiumIcon name="pin" /> {boat.location || 'Location TBC'}</div>
        <div className="listing-title-row">
          <h3>{boat.title}</h3>
          <strong>{currencyGBP(boat.price_gbp)}</strong>
        </div>
        <div className="listing-specs">
          <span><PremiumIcon name="ruler" /> {boat.length_ft || '—'} ft</span>
          <span><PremiumIcon name="engine" /> {boat.fuel_type || 'Fuel TBC'}</span>
          <span><PremiumIcon name="camera" /> {boat.year || 'Year TBC'}</span>
        </div>
        <div className="listing-meta">
          <span>{boat.category}</span>
          {boat.engine_summary && <span>{boat.engine_summary}</span>}
        </div>
      </div>
    </article>
  );
}
