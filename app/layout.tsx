import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Link from 'next/link';
import { createClient, hasSupabaseConfig } from '@/lib/supabase-server';
import { signOut } from './actions';
import { BoatshedLogo } from '@/components/PremiumIcons';

export const metadata: Metadata = {
  title: 'Boatshed Marketplace',
  description: 'A premium marine marketplace for boats, chandlery, marine services and berths.'
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
    <header className="site-header">
      <div className="nav-shell">
        <Link className="brand-link" href="/" aria-label="Boatshed Marketplace home"><BoatshedLogo /></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/boats">Boats</Link>
          <Link href="/chandlery">Chandlery</Link>
          <Link href="/services">Services</Link>
          <Link href="/marinas">Marinas</Link>
          <Link href="/sell">Sell</Link>
          <Link href="/pricing">Brokers</Link>
        </nav>
        <div className="nav-actions">
          {user ? (
            <>
              <Link className="nav-link-subtle" href="/dashboard">Dashboard</Link>
              <form action={signOut}><button className="button button-ghost">Sign out</button></form>
            </>
          ) : (
            <>
              <Link className="nav-link-subtle" href="/auth">Sign in</Link>
              <Link className="button button-orange" href="/sell">List your boat</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <footer className="site-footer">
          <div className="footer-grid">
            <div>
              <BoatshedLogo />
              <p>A premium marketplace layer for boats, brokers, marine services, chandlery and marina opportunities.</p>
            </div>
            <div>
              <h4>Marketplace</h4>
              <Link href="/boats">Boats for sale</Link>
              <Link href="/chandlery">Chandlery</Link>
              <Link href="/services">Marine services</Link>
              <Link href="/marinas">Marinas & berths</Link>
            </div>
            <div>
              <h4>Sellers</h4>
              <Link href="/sell">List your boat</Link>
              <Link href="/pricing">Broker packages</Link>
              <Link href="/dashboard">Seller dashboard</Link>
              <Link href="/auth">Register</Link>
            </div>
            <div>
              <h4>Confidence</h4>
              <span>Verified brokers</span>
              <span>Structured listings</span>
              <span>Direct enquiries</span>
              <span>Global reach</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
