import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-main">
        <div>
          <div className="footer-brand">
            <Logo />
            RealEstate
          </div>
          <p className="footer-tagline">
            A marketplace for listing, discovering, and booking visits to homes —
            built to make finding your next place feel a little less overwhelming.
          </p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <Link to="/properties">Browse properties</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/properties/new">List a property</Link>
        </div>

        <div className="footer-col">
          <h4>Account</h4>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>support@realestate.demo</p>
          <p>Lahore · Karachi · Islamabad</p>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {year} RealEstate — Listed with care.</p>
        <p>Built with the MERN stack</p>
      </div>
    </footer>
  );
}
