import { MarinaCard } from '@/components/MarketplaceCards';
import { marinaListings } from '@/lib/demo-data';

export default function MarinasPage() {
  return (
    <main className="container py-5">
      <div className="row align-items-end gy-3 mb-4">
        <div className="col-lg-8">
          <span className="badge text-bg-primary mb-2">Demo berths and yard offers</span>
          <h1 className="fw-bold">Marinas and berths</h1>
          <p className="text-muted mb-0">Advertise pontoon berths, hardstanding, winter storage, lift-out packages and yard facilities.</p>
        </div>
        <div className="col-lg-4">
          <div className="input-group">
            <input className="form-control" placeholder="Search location" />
            <button className="btn btn-primary">Search</button>
          </div>
        </div>
      </div>
      <div className="row g-4">
        {marinaListings.map((marina) => (
          <div className="col-12 col-md-6 col-xl-4" key={marina.id}><MarinaCard marina={marina} /></div>
        ))}
      </div>
    </main>
  );
}
