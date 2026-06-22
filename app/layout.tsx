import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Link from 'next/link';
import { createClient, hasSupabaseConfig } from '@/lib/supabase-server';
import { signOut } from './actions';

export const metadata: Metadata = {
  title: 'Boatshed Marketplace',
  description: 'A responsive boat marketplace platform for private sellers, brokers and buyers.'
};

async function Nav() {
  let user: unknown = null;
  if (hasSupabaseConfig()) {
    try {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      user = data.user;
    } catch {
      user = null;
    }
  }
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      <div className="container py-2">
        <Link className="navbar-brand fw-bold text-primary fs-4" href="/">Boatshed<span className="text-dark">Market</span></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item"><Link className="nav-link" href="/boats">Boats</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/chandlery">Chandlery</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/services">Services</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/marinas">Marinas</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/sell">Sell</Link></li>
            <li className="nav-item"><Link className="nav-link" href="/pricing">Pricing</Link></li>
            {user ? (
              <>
                <li className="nav-item"><Link className="nav-link" href="/dashboard">Dashboard</Link></li>
                <li className="nav-item">
                  <form action={signOut}><button className="btn btn-outline-secondary btn-sm">Sign out</button></form>
                </li>
              </>
            ) : (
              <li className="nav-item"><Link className="btn btn-primary btn-sm px-3" href="/auth">Login / register</Link></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <footer className="footer mt-5 py-5">
          <div className="container d-flex flex-column flex-md-row justify-content-between gap-3">
            <div>
              <h5 className="text-white">BoatshedMarket</h5>
              <p className="mb-0">A modern marketplace foundation for boats, brokers and serious buyers.</p>
            </div>
            <div className="small">Boats • Chandlery • Services • Marinas • Brokers • Payments-ready</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
