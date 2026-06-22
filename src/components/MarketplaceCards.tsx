import Link from 'next/link';
import { currencyGBP } from '@/lib/format';
import { ChandleryProduct, MarineService, MarinaListing } from '@/lib/demo-data';
import { MarineIcon } from './MarineIcons';

export function ProductCard({ product }: { product: ChandleryProduct }) {
  return (
    <article className="product-card mini-commerce-card">
      <img src={product.image_url} alt={product.name} />
      <div>
        <span>{product.condition}</span>
        <h3>{product.name}</h3>
        <p>{product.category} · {product.location}</p>
        <strong>{currencyGBP(product.price_gbp)}</strong>
      </div>
      <Link href="/chandlery" aria-label={`View ${product.name}`}>＋</Link>
    </article>
  );
}

export function ServiceCard({ service }: { service: MarineService }) {
  return (
    <article className="service-card-premium">
      <div className="service-icon"><MarineIcon name="services" /></div>
      <div>
        <span>★ {service.rating} · {service.response}</span>
        <h3>{service.name}</h3>
        <p>{service.description}</p>
      </div>
      <div className="service-tags">
        {service.services.slice(0, 3).map((item) => <em key={item}>{item}</em>)}
      </div>
      <Link href="/services">Request quote →</Link>
    </article>
  );
}

export function MarinaCard({ marina }: { marina: MarinaListing }) {
  return (
    <article className="service-card-premium marina-card-premium">
      <div className="service-icon"><MarineIcon name="marina" /></div>
      <span>{marina.berth_size}</span>
      <h3>{marina.name}</h3>
      <p>{marina.location} · {marina.price_note}</p>
      <Link href="/marinas">Check availability →</Link>
    </article>
  );
}
