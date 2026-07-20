import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page container">
      <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
        <h1>Find your next home 🏡</h1>
        <p className="muted">
          Browse listings, save favorites, book visits, and leave reviews — all in one place.
        </p>
        <Link className="btn" to="/properties">Browse Properties</Link>
      </div>
    </div>
  );
}
