import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectCurrentUser } from '../features/auth/authSlice.js';
import { useGetCategoriesQuery } from '../features/categories/categoriesApi.js';
import Logo from './Logo.jsx';

const CITIES = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Murree'];

export default function Navbar() {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null); // 'categories' | 'locations' | null
  const { data: categories } = useGetCategoriesQuery();
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setDropdown(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    navigate('/login');
  };

  const close = () => { setOpen(false); setDropdown(null); };
  const toggleDropdown = (name) => setDropdown((d) => (d === name ? null : name));

  return (
    <header className="navbar">
      <div className="container">
        <Link to="/" className="brand" onClick={close}>
          <Logo />
          RealEstate
        </Link>

        <button className="menu-toggle" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          <span style={open ? { transform: 'translateY(6px) rotate(45deg)' } : undefined} />
          <span style={open ? { opacity: 0 } : undefined} />
          <span style={open ? { transform: 'translateY(-6px) rotate(-45deg)' } : undefined} />
        </button>

        <nav className={open ? 'open' : ''} ref={navRef}>
          <Link to="/properties" onClick={close}>Browse</Link>

          <div className="nav-dropdown">
            <button type="button" onClick={() => toggleDropdown('categories')}>
              Categories {dropdown === 'categories' ? '▴' : '▾'}
            </button>
            {dropdown === 'categories' && (
              <div className="dropdown-panel">
                {categories?.length ? (
                  categories.map((c) => (
                    <Link key={c._id} to={`/properties?category=${c._id}`} onClick={close}>
                      {c.name}
                    </Link>
                  ))
                ) : (
                  <span className="dropdown-empty">No categories yet</span>
                )}
              </div>
            )}
          </div>

          <div className="nav-dropdown">
            <button type="button" onClick={() => toggleDropdown('locations')}>
              Locations {dropdown === 'locations' ? '▴' : '▾'}
            </button>
            {dropdown === 'locations' && (
              <div className="dropdown-panel">
                {CITIES.map((city) => (
                  <Link key={city} to={`/properties?location=${city}`} onClick={close}>
                    {city}
                  </Link>
                ))}
              </div>
            )}
          </div>

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
