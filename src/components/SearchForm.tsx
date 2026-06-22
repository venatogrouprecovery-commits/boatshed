import { PremiumIcon } from './PremiumIcons';

export function SearchForm({ initial = {} as Record<string, string | undefined> }) {
  return (
    <form action="/boats" className="premium-search" aria-label="Search marketplace">
      <div className="search-tabs" role="tablist" aria-label="Marketplace categories">
        <button type="button" className="active"><PremiumIcon name="anchor" /> Boats</button>
        <button type="button"><PremiumIcon name="box" /> Chandlery</button>
        <button type="button"><PremiumIcon name="tools" /> Services</button>
        <button type="button"><PremiumIcon name="marina" /> Marinas</button>
      </div>
      <div className="search-fields">
        <label className="search-field search-field-wide">
          <span>Keyword</span>
          <input name="q" defaultValue={initial.q || ''} placeholder="Fairline, Princess, Sunseeker..." />
        </label>
        <label className="search-field">
          <span>Min price</span>
          <input name="min" defaultValue={initial.min || ''} type="number" placeholder="£0" />
        </label>
        <label className="search-field">
          <span>Max price</span>
          <input name="max" defaultValue={initial.max || ''} type="number" placeholder="Any" />
        </label>
        <label className="search-field">
          <span>Location</span>
          <input name="location" defaultValue={initial.location || ''} placeholder="Cowes, Poole, Med..." />
        </label>
        <button className="search-submit"><PremiumIcon name="search" /> Search</button>
      </div>
    </form>
  );
}
