import { MarineIcon } from './MarineIcons';

export function SearchForm({ initial = {} as Record<string, string | undefined> }) {
  return (
    <form action="/boats" className="search-panel premium-search">
      <div className="search-tabs" aria-label="Marketplace search type">
        <button type="button" className="active"><MarineIcon name="boat" /> Boats</button>
        <button type="button"><MarineIcon name="chandlery" /> Chandlery</button>
        <button type="button"><MarineIcon name="services" /> Services</button>
        <button type="button"><MarineIcon name="marina" /> Marinas</button>
      </div>
      <div className="search-fields">
        <label className="search-keyword">
          <span>Search</span>
          <input name="q" defaultValue={initial.q || ''} placeholder="Make, model, service, marina..." />
        </label>
        <label>
          <span>Min</span>
          <input name="min" defaultValue={initial.min || ''} type="number" placeholder="£ min" />
        </label>
        <label>
          <span>Max</span>
          <input name="max" defaultValue={initial.max || ''} type="number" placeholder="£ max" />
        </label>
        <label>
          <span>Location</span>
          <input name="location" defaultValue={initial.location || ''} placeholder="Cowes, Med, UK..." />
        </label>
        <button className="search-submit">Search</button>
      </div>
    </form>
  );
}
