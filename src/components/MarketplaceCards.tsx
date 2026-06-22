import Link from 'next/link';
import { currencyGBP } from '@/lib/format';
import { ChandleryProduct, MarineService, MarinaListing } from '@/lib/demo-data';
import { PremiumIcon } from './PremiumIcons';

export function ProductCard({ product }: { product: ChandleryProduct }) {
  return (
    <article className="market-card product-card">
      <img src={product.image_url} alt={product.name} />
      <div>
        <span className="eyebrow">{product.category} · {product.condition}</span>
        <h3>{product.name}</h3>
        <p>{product.vendor} · {product.location}</p>
        <footer>
          <strong>{currencyGBP(product.price_gbp)}</strong>
          <Link href="/chandlery">View item</Link>
        </footer>
      </div>
    </article>
  );
}

export function ServiceCard({ service }: { service: MarineService }) {
  return (
    <article className="service-panel">
      <div className="service-panel-image"><img src={service.image_url} alt={service.name} /></div>
      <div className="service-panel-copy">
        <span className="eyebrow">{service.category} · ★ {service.rating}</span>
        <h3>{service.name}</h3>
        <p>{service.description}</p>
        <div className="service-tags">
          {service.services.slice(0, 3).map((item) => <span key={item}>{item}</span>)}
        </div>
        <Link href="/services" className="text-arrow">Request quote <PremiumIcon name="arrow" /></Link>
      </div>
    </article>
  );
}

export function MarinaCard({ marina }: { marina: MarinaListing }) {
  return (
    <article className="marina-panel">
      <img src={marina.image_url} alt={marina.name} />
      <div>
        <span className="eyebrow">{marina.berth_size}</span>
        <h3>{marina.name}</h3>
        <p>{marina.location}</p>
        <strong>{marina.price_note}</strong>
        <Link href="/marinas">Check availability</Link>
      </div>
    </article>
  );
}
