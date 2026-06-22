import Link from 'next/link';
import { createClient, hasSupabaseConfig } from '@/lib/supabase-server';
import { BoatCard } from '@/components/BoatCard';
import { ProductCard, ServiceCard, MarinaCard } from '@/components/MarketplaceCards';
import { SearchForm } from '@/components/SearchForm';
import { Boat } from '@/types/database';
import { chandleryProducts, demoBoats, marinaListings, marineServices } from '@/lib/demo-data';

export default async function Home() {
  let liveBoats: Boat[] | null = null;
  if (hasSupabaseConfig()) {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from('boats')
        .select('*')
        .eq('status', 'approved')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(6);
      liveBoats = data as Boat[] | null;
    } catch {
      liveBoats = null;
    }
  }

  const boats = (liveBoats?.length ? liveBoats : demoBoats.slice(0, 6)) as Boat[];

  return (
    <main>
      <section className="hero py-5 py-md-6">
        <div className="container py-5">
          <div className="row align-items-center gy-4">
            <div className="col-lg-7">
              <span className="badge text-bg-light mb-3">Live demo marketplace</span>
              <h1 className="display-4 fw-bold">The marine marketplace for boats, chandlery, berths and services.</h1>
              <p className="lead opacity-75">A responsive platform for private sellers, brokers, suppliers, engineers, marinas and serious buyers.</p>
              <div className="d-flex flex-column flex-sm-row gap-2 mt-4">
                <Link className="btn btn-light btn-lg" href="/boats">Browse boats</Link>
                <Link className="btn btn-outline-light btn-lg" href="/sell">Advertise now</Link>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="market-snapshot card bg-white bg-opacity-10 border-0 text-white p-3 p-md-4">
                <div className="row g-3 text-center">
                  <div className="col-6"><strong className="fs-2">128</strong><span>boats listed</span></div>
                  <div className="col-6"><strong className="fs-2">46</strong><span>marine services</span></div>
                  <div className="col-6"><strong className="fs-2">312</strong><span>chandlery items</span></div>
                  <div className="col-6"><strong className="fs-2">18</strong><span>marina offers</span></div>
                </div>
                <hr className="border-light opacity-25" />
                <p className="mb-0 small opacity-75">Demo content is included so the site looks active before real Supabase data is added.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container"><SearchForm /></div>

      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h2 className="fw-bold">Featured boats</h2>
            <p className="text-muted mb-0">Broker and private listings across motorboats, sailboats and RIBs.</p>
          </div>
          <Link href="/boats" className="btn btn-outline-primary d-none d-md-inline-flex">View all boats</Link>
        </div>
        <div className="row g-4">
          {boats.map((boat: Boat) => (
            <div className="col-12 col-md-6 col-lg-4" key={boat.id}><BoatCard boat={boat} /></div>
          ))}
        </div>
      </section>

      <section className="container pb-5">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="section-tile h-100 p-4 p-lg-5 rounded-4">
              <span className="badge text-bg-primary mb-3">New revenue stream</span>
              <h2 className="fw-bold">Chandlery marketplace</h2>
              <p className="text-muted">Suppliers can advertise marine equipment, refit parts, electronics, safety kit and used spares.</p>
              <Link href="/chandlery" className="btn btn-primary">Browse chandlery</Link>
            </div>
          </div>
          {chandleryProducts.slice(0, 2).map((product) => (
            <div className="col-md-6 col-lg-4" key={product.id}><ProductCard product={product} /></div>
          ))}
        </div>
      </section>

      <section className="bg-white py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h2 className="fw-bold">Marine services</h2>
              <p className="text-muted mb-0">Engineers, upholsterers, surveyors, electronics installers, transport and refit specialists.</p>
            </div>
            <Link href="/services" className="btn btn-outline-primary d-none d-md-inline-flex">View services</Link>
          </div>
          <div className="row g-4">
            {marineServices.slice(0, 3).map((service) => (
              <div className="col-md-6 col-lg-4" key={service.id}><ServiceCard service={service} /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="row g-4 align-items-stretch">
          <div className="col-lg-8">
            <div className="row g-4">
              {marinaListings.slice(0, 2).map((marina) => (
                <div className="col-md-6" key={marina.id}><MarinaCard marina={marina} /></div>
              ))}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="section-tile h-100 p-4 p-lg-5 rounded-4">
              <span className="badge text-bg-warning mb-3">Marketplace moat</span>
              <h2 className="fw-bold">Berths and marina offers</h2>
              <p className="text-muted">Let marinas advertise berth availability, winter storage, lift-out packages and yard services.</p>
              <Link href="/marinas" className="btn btn-primary">View marina offers</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
