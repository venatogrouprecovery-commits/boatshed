import { PremiumIcon } from './PremiumIcons';

export function SearchForm({ initial = {} as Record<string, string | undefined> }) {
  return (
    <form action="/boats" className="premium-search" aria-label="Search boats">
      <div className="search-tabs" role="tablist" aria-label="Search method">
        <button type="button" className="active">Search Boats</button>
        <button type="button">By Reference</button>
      </div>
      <div className="search-fields">
        <label className="search-field search-field-wide">
          <span><PremiumIcon name="search" /> Make / Model</span>
          <input name="q" defaultValue={initial.q || ''} placeholder="e.g. Jeanneau Sun Odyssey" />
        </label>
        <label className="search-field">
          <span><PremiumIcon name="anchor" /> Boat type</span>
          <input name="type" placeholder="Any type" />
        </label>
        <label className="search-field">
          <span><PremiumIcon name="box" /> Price</span>
          <input name="max" defaultValue={initial.max || ''} type="number" placeholder="Any price" />
        </label>
        <label className="search-field">
          <span><PremiumIcon name="pin" /> Location</span>
          <input name="location" defaultValue={initial.location || ''} placeholder="Any location" />
        </label>
        <label className="search-field">
          <span><PremiumIcon name="ruler" /> Length</span>
          <input name="length" placeholder="Any length" />
        </label>
        <button className="search-submit">Search boats</button>
      </div>
    </form>
  );
}
