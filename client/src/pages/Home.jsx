import { Link } from 'react-router-dom';

const CITIES = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan'];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <p className="hero-eyebrow">Find · List · Move In</p>
          <h1>The next place you'll call home is already listed.</h1>
          <p>
            Browse verified listings, save your favorites, book a visit, and hear
            straight from people who've already lived there.
          </p>
          <Link className="btn" to="/properties">Browse Properties</Link>
        </div>

        <div className="ticker">
          <div className="ticker-track">
            {[...CITIES, ...CITIES].map((city, i) => (
              <span key={i}>{city}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="page container">
        <div className="grid">
          <div className="card">
            <h3>Browse with real filters</h3>
            <p className="muted">Search by location and price range to narrow down exactly what fits your budget.</p>
          </div>
          <div className="card">
            <h3>Book a visit in a click</h3>
            <p className="muted">Request a visit date directly from a listing — no phone tag with agents required.</p>
          </div>
          <div className="card">
            <h3>Hear from real tenants</h3>
            <p className="muted">Ratings and reviews from people who've actually visited or lived in the property.</p>
          </div>
        </div>
      </div>
    </>
  );
}
