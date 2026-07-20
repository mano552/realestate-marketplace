import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetPropertiesQuery } from '../features/properties/propertiesApi.js';

export default function Properties() {
  const [filters, setFilters] = useState({ location: '', minPrice: '', maxPrice: '' });
  const { data: properties, isLoading, error } = useGetPropertiesQuery(filters);

  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  return (
    <div className="page container">
      <h2>Browse Properties</h2>

      <div className="card" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <input
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleChange}
          style={{ flex: 1, padding: 8 }}
        />
        <input
          name="minPrice"
          type="number"
          placeholder="Min price"
          value={filters.minPrice}
          onChange={handleChange}
          style={{ width: 120, padding: 8 }}
        />
        <input
          name="maxPrice"
          type="number"
          placeholder="Max price"
          value={filters.maxPrice}
          onChange={handleChange}
          style={{ width: 120, padding: 8 }}
        />
      </div>

      {isLoading && <p>Loading properties...</p>}
      {error && <p className="error">Failed to load properties.</p>}

      <div className="grid">
        {properties?.map((p) => (
          <Link key={p._id} to={`/properties/${p._id}`} className="card">
            <img
              className="property-img"
              src={p.imageUrl || 'https://placehold.co/400x260?text=Property'}
              alt={p.title}
            />
            <h3>{p.title}</h3>
            <p className="muted">{p.location}</p>
            <p className="price">${p.price.toLocaleString()}</p>
            <span className="badge">{p.bedrooms} bd</span>
            <span className="badge">{p.bathrooms} ba</span>
          </Link>
        ))}
      </div>
      {properties?.length === 0 && <p className="muted">No properties match your filters.</p>}
    </div>
  );
}
