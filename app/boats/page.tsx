import { createClient, hasSupabaseConfig } from '@/lib/supabase-server';
import { BoatCard } from '@/components/BoatCard';
import { SearchForm } from '@/components/SearchForm';
import { Boat } from '@/types/database';
import { demoBoats } from '@/lib/demo-data';

function filterDemoBoats(searchParams: Record<string, string | undefined>) {
  return demoBoats.filter((boat) => {
    const haystack = `${boat.title} ${boat.make} ${boat.model} ${boat.description}`.toLowerCase();
    if (searchParams.q && !haystack.includes(searchParams.q.toLowerCase())) return false;
    if (searchParams.location && !boat.location.toLowerCase().includes(searchParams.location.toLowerCase())) return false;
    if (searchParams.min && (boat.price_gbp || 0) < Number(searchParams.min)) return false;
    if (searchParams.max && (boat.price_gbp || 0) > Number(searchParams.max)) return false;
    return true;
  });
}

export default async function BoatsPage({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  let liveBoats: Boat[] | null = null;
  if (hasSupabaseConfig()) {
    try {
      const supabase = createClient();
      let query = supabase.from('boats').select('*').eq('status', 'approved');
      if (searchParams.q) query = query.or(`title.ilike.%${searchParams.q}%,make.ilike.%${searchParams.q}%,model.ilike.%${searchParams.q}%,description.ilike.%${searchParams.q}%`);
      if (searchParams.location) query = query.ilike('location', `%${searchParams.location}%`);
      if (searchParams.min) query = query.gte('price_gbp', Number(searchParams.min));
      if (searchParams.max) query = query.lte('price_gbp', Number(searchParams.max));
      const { data } = await query.order('featured', { ascending: false }).order('created_at', { ascending: false });
      liveBoats = data as Boat[] | null;
    } catch {
      liveBoats = null;
    }
  }
  const boats = (liveBoats?.length ? liveBoats : filterDemoBoats(searchParams)) as Boat[];

  return (
    <main className="subpage">
      <section className="subpage-hero boats-hero">
        <span className="section-kicker">Premium inventory</span>
        <h1>Boats for sale across the marketplace.</h1>
        <p>Filter by make, model, budget and location. Approved live listings replace the demo inventory automatically once Supabase is populated.</p>
        <div className="subpage-search-panel"><SearchForm initial={searchParams} /></div>
      </section>

      <section className="subpage-section">
        <div className="results-bar">
          <strong>{boats.length} listings shown</strong>
          <span>Broker, dealer and private seller adverts</span>
        </div>
        {boats.length ? (
          <div className="boats-results-grid">
            {boats.map((boat: Boat) => <BoatCard boat={boat} key={boat.id} />)}
          </div>
        ) : (
          <div className="empty-state">No matching approved listings.</div>
        )}
      </section>
    </main>
  );
}
