import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Link from 'next/link';
import { createClient, hasSupabaseConfig } from '@/lib/supabase-server';
import { signOut } from './actions';
import { BoatshedLogo } from '@/components/MarineIcons';

export const metadata: Metadata = {
  title: 'Boatshed Marketplace',
  description: 'A premium marine marketplace for boats, chandlery, services, berths and brokers.'
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
      <div className="nav-wrap container-fluid">
        <Link className="brand-link" href="/" aria-label="Boatshed Marketplace home">
          <BoatshedLogo />
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
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
              <Link className="ghost-link" href="/dashboard">Dashboard</Link>
              <form action={signOut}><button className="nav-button ghost-button">Sign out</button></form>
            </>
          ) : (
            <Link className="ghost-link" href="/auth">Sign in</Link>
          )}
          <Link className="nav-button hot-button" href="/sell">List your boat</Link>
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
          <div className="footer-glow" />
          <div className="container footer-grid">
            <div className="footer-brand">
              <BoatshedLogo />
              <p>Your global marketplace for boats, chandlery, trusted marine services and berths.</p>
              <div className="social-dots" aria-label="Social links"><span /> <span /> <span /> <span /></div>
            </div>
            <div>
              <h6>Marketplace</h6>
              <Link href="/boats">Boats</Link>
              <Link href="/chandlery">Chandlery</Link>
              <Link href="/services">Services</Link>
              <Link href="/marinas">Marinas</Link>
            </div>
            <div>
              <h6>Sell</h6>
              <Link href="/sell">Sell your boat</Link>
              <Link href="/pricing">Broker plans</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/admin">Admin</Link>
            </div>
            <div>
              <h6>Support</h6>
              <a href="#">Help centre</a>
              <a href="#">Safety</a>
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
            </div>
            <div className="newsletter-card">
              <h6>Stay in the loop</h6>
              <p>New listings, refit services, berth offers and marine deals.</p>
              <form className="newsletter-form"><input placeholder="Email address" /><button>Join</button></form>
            </div>
          </div>
          <div className="container footer-bottom">© 2026 Boatshed Marketplace. Built for a modern marine marketplace.</div>
        </footer>
      </body>
    </html>
  );
}
