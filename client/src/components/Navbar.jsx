import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectCurrentUser } from '../features/auth/authSlice.js';

export default function Navbar() {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    navigate('/login');
  };

  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="container">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-dot" />
          RealEstate
        </Link>

        <button className="menu-toggle" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          <span style={open ? { transform: 'translateY(6px) rotate(45deg)' } : undefined} />
          <span style={open ? { opacity: 0 } : undefined} />
          <span style={open ? { transform: 'translateY(-6px) rotate(-45deg)' } : undefined} />
        </button>

        <nav className={open ? 'open' : ''}>
          <Link to="/properties" onClick={close}>Browse</Link>
          {user ? (
            <>
              <Link to="/dashboard" onClick={close}>Dashboard</Link>
              <Link to="/properties/new" onClick={close}>List Property</Link>
              <button onClick={handleLogout}>Logout ({user.name})</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={close}>Login</Link>
              <Link to="/register" onClick={close}>Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
