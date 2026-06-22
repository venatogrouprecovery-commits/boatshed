import { MarinaCard } from '@/components/MarketplaceCards';
import { marinaListings } from '@/lib/demo-data';

export default function MarinasPage() {
  return (
    <main className="subpage">
      <section className="subpage-hero marinas-hero">
        <span className="section-kicker">Marinas, berths and yards</span>
        <h1>Annual berths, visitor moorings, lift-outs and winter storage.</h1>
        <p>Showcase berth adverts and yard packages alongside the boat marketplace so buyers can solve the whole ownership journey.</p>
        <div className="subpage-search">
          <input placeholder="Search location, berth size or marina..." />
          <button>Check availability</button>
        </div>
      </section>

      <section className="subpage-section marina-directory-layout">
        <aside className="large-map-panel">
          <div className="concept-map big-map"><i /><b /></div>
          <h2>Featured berth availability</h2>
          <p>Premium map-style placement for marinas, yard services and seasonal packages.</p>
        </aside>
        <div className="marina-directory-grid">
          {marinaListings.map((marina) => <MarinaCard marina={marina} key={marina.id} />)}
        </div>
      </section>
    </main>
  );
}
