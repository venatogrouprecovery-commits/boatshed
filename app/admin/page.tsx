import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase-server';
import { approveBoat } from '../actions';
import { Boat } from '@/types/database';
import { currencyGBP, titleCase } from '@/lib/format';

export default async function AdminPage() {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect('/auth');

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', userData.user.id).single();
  if (profile?.role !== 'admin') redirect('/dashboard');

  const { data: boats } = await supabase.from('boats').select('*').order('created_at', { ascending: false }).limit(100);
  const list = (boats || []) as Boat[];

  return (
    <main className="container py-5">
      <h1 className="fw-bold">Admin moderation</h1>
      <p className="text-muted">Approve, reject or mark boats as sold.</p>
      <div className="vstack gap-3">
        {list.map(boat => <div className="card admin-row border-0 shadow-sm" key={boat.id}><div className="card-body p-3 p-md-4">
          <div className="row g-3 align-items-center">
            <div className="col-md-2"><img src={boat.main_image_url || 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=500&q=80'} className="img-fluid rounded" alt="" /></div>
            <div className="col-md-5"><h5>{boat.title}</h5><p className="small text-muted mb-0">{boat.location} • {currencyGBP(boat.price_gbp)} • {titleCase(boat.status)}</p></div>
            <div className="col-md-5"><div className="d-flex flex-wrap gap-2 justify-content-md-end">
              {['approved', 'rejected', 'sold'].map(status => <form action={approveBoat} key={status}>
                <input type="hidden" name="id" value={boat.id} />
                <input type="hidden" name="status" value={status} />
                <button className="btn btn-sm btn-outline-primary">{titleCase(status)}</button>
              </form>)}
            </div></div>
          </div>
        </div></div>)}
        {!list.length && <div className="alert alert-info">No listings yet.</div>}
      </div>
    </main>
  );
}
