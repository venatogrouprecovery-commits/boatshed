import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { currencyGBP } from '@/lib/format';
import { createEnquiry } from '@/app/actions';
import { Boat } from '@/types/database';
import { demoBoats, chandleryProducts, marineServices } from '@/lib/demo-data';
import { ProductCard, ServiceCard } from '@/components/MarketplaceCards';

export default async function BoatDetail({ params }: { params: { id: string } }) {
  const supabase = createClient();
  let boat: Boat | null = null;

  if (params.id.startsWith('demo-')) {
    boat = demoBoats.find((item) => item.id === params.id) || null;
  } else {
    const { data } = await supabase.from('boats').select('*').eq('id', params.id).single();
    boat = data as Boat | null;
  }

  if (!boat || boat.status !== 'approved') notFound();

  return (
    <main className="container py-5">
      <div className="row g-5">
        <div className="col-lg-8">
          <img src={boat.main_image_url || 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80'} className="img-fluid rounded-4 shadow-sm w-100 mb-4 listing-hero-img" alt={boat.title} />
          <div className="d-flex flex-wrap gap-2 mb-3">
            {boat.featured && <span className="badge text-bg-warning">Featured</span>}
            {boat.id.startsWith('demo-') && <span className="badge text-bg-primary">Demo listing</span>}
            <span className="badge text-bg-light border">{boat.category}</span>
          </div>
          <h1 className="fw-bold">{boat.title}</h1>
          <p className="lead text-muted">{boat.location}, {boat.country}</p>
          <div className="row g-3 my-4">
            {[
              ['Make', boat.make], ['Model', boat.model], ['Year', boat.year || 'TBC'], ['Length', boat.length_ft ? `${boat.length_ft} ft` : 'TBC'], ['Beam', boat.beam_ft ? `${boat.beam_ft} ft` : 'TBC'], ['Draft', boat.draft_ft ? `${boat.draft_ft} ft` : 'TBC'], ['Fuel', boat.fuel_type || 'TBC'], ['Engine hours', boat.engine_hours || 'TBC']
            ].map(([label, value]) => <div className="col-6 col-md-3" key={label}><div className="card border-0 shadow-sm p-3 h-100"><span className="small text-muted">{label}</span><strong>{value}</strong></div></div>)}
          </div>
          <h4>Description</h4>
          <p className="lh-lg">{boat.description}</p>
          {boat.engine_summary && <><h4>Engines</h4><p>{boat.engine_summary}</p></>}

          <section className="mt-5">
            <h4 className="fw-bold">Suggested chandlery for this boat</h4>
            <div className="row g-4 mt-1">
              {chandleryProducts.slice(0, 2).map((product) => <div className="col-md-6" key={product.id}><ProductCard product={product} /></div>)}
            </div>
          </section>

          <section className="mt-5">
            <h4 className="fw-bold">Useful marine services nearby</h4>
            <div className="row g-4 mt-1">
              {marineServices.slice(0, 2).map((service) => <div className="col-md-6" key={service.id}><ServiceCard service={service} /></div>)}
            </div>
          </section>
        </div>
        <aside className="col-lg-4">
          <div className="card border-0 shadow-sm sticky-lg-top" style={{ top: '6rem' }}>
            <div className="card-body p-4">
              <p className="fs-2 fw-bold text-primary mb-1">{currencyGBP(boat.price_gbp)}</p>
              <p className="text-muted">{boat.category}</p>
              <hr />
              <h5>Enquire about this boat</h5>
              <form action={createEnquiry} className="vstack gap-3">
                <input type="hidden" name="boat_id" value={boat.id} />
                <input className="form-control" name="name" placeholder="Your name" />
                <input className="form-control" type="email" name="email" placeholder="Email address" required />
                <textarea className="form-control" name="message" rows={5} placeholder="Ask about viewing, survey, finance, berth..." required />
                <button className="btn btn-primary btn-lg">Send enquiry</button>
                <button type="button" className="btn btn-outline-secondary">Save favourite</button>
              </form>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
