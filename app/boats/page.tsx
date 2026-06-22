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
    <main className="container py-5">
      <div className="mb-4">
        <span className="badge text-bg-primary mb-2">Demo inventory included</span>
        <h1 className="fw-bold">Boats for sale</h1>
        <p className="text-muted">Filter by make, model, budget and location. When Supabase has live listings, they automatically replace the demo inventory.</p>
      </div>
      <div className="mb-5"><SearchForm initial={searchParams} /></div>
      <div className="row g-4">
        {boats.length ? boats.map((boat: Boat) => (
          <div className="col-12 col-md-6 col-xl-4" key={boat.id}><BoatCard boat={boat} /></div>
        )) : <div className="col-12"><div className="alert alert-warning">No matching approved listings.</div></div>}
      </div>
    </main>
  );
}
