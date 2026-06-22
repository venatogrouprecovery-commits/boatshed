import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { Boat } from '@/types/database';
import { currencyGBP, titleCase } from '@/lib/format';

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect('/auth');

  const { data: boats } = await supabase.from('boats').select('*').eq('owner_id', userData.user.id).order('created_at', { ascending: false });
  const list = (boats || []) as Boat[];

  return (
    <main className="container py-5">
      <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
        <div><h1 className="fw-bold">Seller dashboard</h1><p className="text-muted">Manage your adverts and track approval status.</p></div>
        <Link className="btn btn-primary align-self-start" href="/sell">Create listing</Link>
      </div>
      <div className="row g-3 mb-4">
        <div className="col-md-4"><div className="card dashboard-stat border-0 shadow-sm p-3"><span className="text-muted">Total listings</span><strong className="fs-3">{list.length}</strong></div></div>
        <div className="col-md-4"><div className="card dashboard-stat border-0 shadow-sm p-3"><span className="text-muted">Approved</span><strong className="fs-3">{list.filter(b => b.status === 'approved').length}</strong></div></div>
        <div className="col-md-4"><div className="card dashboard-stat border-0 shadow-sm p-3"><span className="text-muted">Pending</span><strong className="fs-3">{list.filter(b => b.status === 'pending').length}</strong></div></div>
      </div>
      <div className="card border-0 shadow-sm"><div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead><tr><th>Boat</th><th>Price</th><th>Status</th><th>Location</th><th></th></tr></thead>
          <tbody>
            {list.length ? list.map(boat => <tr key={boat.id}>
              <td><strong>{boat.title}</strong><div className="small text-muted">{boat.make} {boat.model}</div></td>
              <td>{currencyGBP(boat.price_gbp)}</td>
              <td><span className="badge text-bg-secondary">{titleCase(boat.status)}</span></td>
              <td>{boat.location}</td>
              <td>{boat.status === 'approved' && <Link className="btn btn-sm btn-outline-primary" href={`/boats/${boat.id}`}>View</Link>}</td>
            </tr>) : <tr><td colSpan={5} className="p-4 text-muted">No listings yet.</td></tr>}
          </tbody>
        </table>
      </div></div>
    </main>
  );
}
