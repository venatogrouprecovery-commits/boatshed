import { ProductCard } from '@/components/MarketplaceCards';
import { chandleryProducts } from '@/lib/demo-data';

export default function ChandleryPage() {
  const categories = Array.from(new Set(chandleryProducts.map((item) => item.category)));
  return (
    <main className="container py-5">
      <div className="row align-items-end gy-3 mb-4">
        <div className="col-lg-8">
          <span className="badge text-bg-primary mb-2">Demo chandlery</span>
          <h1 className="fw-bold">Marine chandlery</h1>
          <p className="text-muted mb-0">Demo products for refits, electronics, safety, galley upgrades and classic marine spares.</p>
        </div>
        <div className="col-lg-4">
          <div className="input-group">
            <input className="form-control" placeholder="Search chandlery" />
            <button className="btn btn-primary">Search</button>
          </div>
        </div>
      </div>
      <div className="d-flex flex-wrap gap-2 mb-4">
        {categories.map((category) => <span key={category} className="badge rounded-pill text-bg-light border px-3 py-2">{category}</span>)}
      </div>
      <div className="row g-4">
        {chandleryProducts.map((product) => (
          <div className="col-12 col-md-6 col-xl-4" key={product.id}><ProductCard product={product} /></div>
        ))}
      </div>
    </main>
  );
}
