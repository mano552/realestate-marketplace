import { Link } from 'react-router-dom';
import Stats from '../components/Stats.jsx';

const CITIES = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan'];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />

        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="hero-eyebrow">Find · List · Move In</p>
            <h1>The next place you'll call home is already listed.</h1>
            <p>
              Browse verified listings, save your favorites, book a visit, and hear
              straight from people who've already lived there.
            </p>
            <div className="hero-actions">
              <Link className="btn" to="/properties">Browse Properties</Link>
              <Link className="btn secondary" to="/properties/new">List a Property</Link>
            </div>
          </div>

          <div className="hero-card">
            <span className="hero-card-eyebrow">Featured today</span>
            <h3>Duplex Home with Rooftop Garden</h3>
            <p className="muted">DHA Phase 2, Islamabad</p>
            <p className="price">$95,000,000</p>
            <div>
              <span className="badge">4 bd</span>
              <span className="badge">4 ba</span>
            </div>
          </div>
        </div>

        <div className="ticker">
          <div className="ticker-track">
            {[...CITIES, ...CITIES].map((city, i) => (
              <span key={i}>{city}</span>
            ))}
          </div>
        </div>
      </section>

      <Stats />

      <div className="page container">
        <div className="grid">
          <div className="card">
            <h3>Browse with real filters</h3>
            <p className="muted">Search by location, category, and price range to narrow down exactly what fits your budget.</p>
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
