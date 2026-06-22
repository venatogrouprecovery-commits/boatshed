import { createBoat } from '@/app/actions';

export default function SellPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <main className="container py-5 form-shell">
      <h1 className="fw-bold">Advertise a boat</h1>
      <p className="text-muted">Create a structured listing. New listings go into admin approval before appearing publicly.</p>
      {searchParams.error && <div className="alert alert-danger">{searchParams.error}</div>}
      <form action={createBoat} className="card border-0 shadow-sm"><div className="card-body p-4">
        <div className="row g-3">
          <div className="col-md-8"><label className="form-label">Listing title</label><input className="form-control" name="title" placeholder="1988 Fairline 40 Flybridge" required /></div>
          <div className="col-md-4"><label className="form-label">Category</label><select className="form-select" name="category"><option>Motor yacht</option><option>Sailing yacht</option><option>Flybridge</option><option>Sports cruiser</option><option>RIB</option><option>Narrowboat</option></select></div>
          <div className="col-md-4"><label className="form-label">Make</label><input className="form-control" name="make" required /></div>
          <div className="col-md-4"><label className="form-label">Model</label><input className="form-control" name="model" required /></div>
          <div className="col-md-4"><label className="form-label">Year</label><input className="form-control" name="year" type="number" /></div>
          <div className="col-md-4"><label className="form-label">Price GBP</label><input className="form-control" name="price_gbp" type="number" /></div>
          <div className="col-md-4"><label className="form-label">Length ft</label><input className="form-control" name="length_ft" type="number" step="0.1" /></div>
          <div className="col-md-4"><label className="form-label">Beam ft</label><input className="form-control" name="beam_ft" type="number" step="0.1" /></div>
          <div className="col-md-4"><label className="form-label">Draft ft</label><input className="form-control" name="draft_ft" type="number" step="0.1" /></div>
          <div className="col-md-4"><label className="form-label">Location</label><input className="form-control" name="location" placeholder="Cowes, Isle of Wight" required /></div>
          <div className="col-md-4"><label className="form-label">Country</label><input className="form-control" name="country" defaultValue="United Kingdom" /></div>
          <div className="col-md-4"><label className="form-label">Fuel type</label><input className="form-control" name="fuel_type" placeholder="Diesel" /></div>
          <div className="col-md-8"><label className="form-label">Engine summary</label><input className="form-control" name="engine_summary" placeholder="Twin Volvo Penta TAMD61A" /></div>
          <div className="col-md-4"><label className="form-label">Engine hours</label><input className="form-control" name="engine_hours" type="number" /></div>
          <div className="col-12"><label className="form-label">Main image URL for MVP</label><input className="form-control" name="main_image_url" placeholder="https://..." /></div>
          <div className="col-12"><label className="form-label">Description</label><textarea className="form-control" name="description" rows={8} required placeholder="Describe condition, equipment, service history, ownership, survey, upgrades and viewings." /></div>
          <div className="col-12"><button className="btn btn-primary btn-lg">Submit for approval</button></div>
        </div>
      </div></form>
    </main>
  );
}
