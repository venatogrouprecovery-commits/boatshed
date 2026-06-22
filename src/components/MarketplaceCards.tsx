import Link from 'next/link';
import { currencyGBP } from '@/lib/format';
import { ChandleryProduct, MarineService, MarinaListing } from '@/lib/demo-data';

export function ProductCard({ product }: { product: ChandleryProduct }) {
  return (
    <article className="bm-product-card">
      <img src={product.image_url} alt={product.name} />
      <div>
        <span>{product.condition}</span>
        <h3>{product.name}</h3>
        <p>{product.category}</p>
        <strong>{currencyGBP(product.price_gbp)}</strong>
      </div>
      <Link href="/chandlery" aria-label={`View ${product.name}`}>View</Link>
    </article>
  );
}

export function ServiceCard({ service }: { service: MarineService }) {
  return (
    <article className="bm-service-card">
      <img src={service.image_url} alt={service.name} />
      <div>
        <span>{service.category}</span>
        <h3>{service.name}</h3>
        <p>{service.area}</p>
        <Link href="/services">Request quote</Link>
      </div>
    </article>
  );
}

export function MarinaCard({ marina }: { marina: MarinaListing }) {
  return (
    <article className="bm-service-card">
      <img src={marina.image_url} alt={marina.name} />
      <div>
        <span>{marina.berth_size}</span>
        <h3>{marina.name}</h3>
        <p>{marina.location} · {marina.price_note}</p>
        <Link href="/marinas">Check availability</Link>
      </div>
    </article>
  );
}
