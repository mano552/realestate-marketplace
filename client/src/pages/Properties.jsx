import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useGetPropertiesQuery } from '../features/properties/propertiesApi.js';
import { useGetCategoriesQuery } from '../features/categories/categoriesApi.js';

export const CITIES = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Murree'];

export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: categories } = useGetCategoriesQuery();

  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    category: searchParams.get('category') || '',
  });

  // Keep filters in sync if the URL changes (e.g. clicked from navbar dropdown)
  useEffect(() => {
    setFilters({
      location: searchParams.get('location') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      category: searchParams.get('category') || '',
    });
  }, [searchParams]);

  const { data: properties, isLoading, error } = useGetPropertiesQuery(filters);

  const handleChange = (e) => {
    const next = { ...filters, [e.target.name]: e.target.value };
    setFilters(next);
    const cleaned = Object.fromEntries(Object.entries(next).filter(([, v]) => v));
    setSearchParams(cleaned);
  };

  const activeCategory = categories?.find((c) => c._id === filters.category);

  return (
    <div className="page container">
      <h2>Browse Properties</h2>
      {(filters.location || activeCategory) && (
        <p className="muted" style={{ marginTop: -8, marginBottom: 18 }}>
          Showing{activeCategory ? ` ${activeCategory.name.toLowerCase()} listings` : ' properties'}
          {filters.location ? ` in ${filters.location}` : ''}
        </p>
      )}

      <div className="card filter-bar">
        <select name="location" value={filters.location} onChange={handleChange}>
          <option value="">All Locations</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <select name="category" value={filters.category} onChange={handleChange}>
          <option value="">All Categories</option>
          {categories?.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <input
          name="minPrice"
          type="number"
          placeholder="Min price"
          value={filters.minPrice}
          onChange={handleChange}
        />
        <input
          name="maxPrice"
          type="number"
          placeholder="Max price"
          value={filters.maxPrice}
          onChange={handleChange}
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
      {properties?.length === 0 && !isLoading && (
        <p className="muted">No properties match your filters.</p>
      )}
    </div>
  );
}
