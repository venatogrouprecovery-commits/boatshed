export default function PricingPage() {
  const plans = [
    ['Private listing', '£29', ['Single advert', '30 days live', 'Enquiry forwarding', 'Optional featured upgrade']],
    ['Broker starter', '£149/mo', ['Up to 25 live boats', 'Broker dashboard', 'Lead inbox', 'Branch profile']],
    ['Broker pro', '£399/mo', ['Unlimited listings', 'Featured stock rotation', 'Team users', 'Import/API ready']]
  ];
  return (
    <main className="container py-5">
      <div className="text-center mb-5"><h1 className="fw-bold">Marketplace pricing</h1><p className="text-muted">Pricing UI is ready. Stripe integration can be added against these plan IDs.</p></div>
      <div className="row g-4">
        {plans.map(([name, price, features]) => <div className="col-md-4" key={name as string}>
          <div className="card border-0 shadow-sm h-100"><div className="card-body p-4 d-flex flex-column">
            <h4>{name}</h4><p className="display-6 fw-bold text-primary">{price}</p><ul className="lh-lg">{(features as string[]).map(f => <li key={f}>{f}</li>)}</ul><button className="btn btn-primary mt-auto">Choose plan</button>
          </div></div>
        </div>)}
      </div>
    </main>
  );
}
