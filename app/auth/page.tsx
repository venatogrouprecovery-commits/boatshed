import { signIn, signUp } from '@/app/actions';

export default function AuthPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <main className="container py-5">
      <div className="row justify-content-center g-4">
        <div className="col-lg-10">
          <h1 className="fw-bold text-center">Account access</h1>
          <p className="text-muted text-center">Register as a buyer, private seller or broker.</p>
          {searchParams.error && <div className="alert alert-danger">{searchParams.error}</div>}
        </div>
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100"><div className="card-body p-4">
            <h3>Login</h3>
            <form action={signIn} className="vstack gap-3">
              <input className="form-control form-control-lg" type="email" name="email" placeholder="Email" required />
              <input className="form-control form-control-lg" type="password" name="password" placeholder="Password" required />
              <button className="btn btn-primary btn-lg">Login</button>
            </form>
          </div></div>
        </div>
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100"><div className="card-body p-4">
            <h3>Create account</h3>
            <form action={signUp} className="vstack gap-3">
              <input className="form-control form-control-lg" name="full_name" placeholder="Full name" />
              <input className="form-control form-control-lg" type="email" name="email" placeholder="Email" required />
              <input className="form-control form-control-lg" type="password" name="password" placeholder="Password, minimum 8 characters" required />
              <select className="form-select form-select-lg" name="role" defaultValue="buyer">
                <option value="buyer">Buyer</option>
                <option value="seller">Private seller</option>
                <option value="broker">Broker/dealer</option>
              </select>
              <button className="btn btn-dark btn-lg">Register</button>
            </form>
          </div></div>
        </div>
      </div>
    </main>
  );
}
