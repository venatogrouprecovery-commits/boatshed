export function SearchForm({ initial = {} as Record<string, string | undefined> }) {
  return (
    <form action="/boats" className="card border-0 shadow search-panel">
      <div className="card-body p-3 p-md-4">
        <div className="row g-3 align-items-end">
          <div className="col-12 col-md-4">
            <label className="form-label">Search</label>
            <input className="form-control form-control-lg" name="q" defaultValue={initial.q || ''} placeholder="Fairline, Princess, Sunseeker..." />
          </div>
          <div className="col-6 col-md-2">
            <label className="form-label">Min price</label>
            <input className="form-control form-control-lg" name="min" defaultValue={initial.min || ''} type="number" />
          </div>
          <div className="col-6 col-md-2">
            <label className="form-label">Max price</label>
            <input className="form-control form-control-lg" name="max" defaultValue={initial.max || ''} type="number" />
          </div>
          <div className="col-12 col-md-2">
            <label className="form-label">Location</label>
            <input className="form-control form-control-lg" name="location" defaultValue={initial.location || ''} placeholder="Cowes" />
          </div>
          <div className="col-12 col-md-2 d-grid">
            <button className="btn btn-primary btn-lg">Search boats</button>
          </div>
        </div>
      </div>
    </form>
  );
}
