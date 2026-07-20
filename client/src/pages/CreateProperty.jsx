import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreatePropertyMutation } from '../features/properties/propertiesApi.js';
import { useGetCategoriesQuery } from '../features/categories/categoriesApi.js';

export default function CreateProperty() {
  const [form, setForm] = useState({
    title: '', description: '', price: '', location: '',
    bedrooms: '', bathrooms: '', imageUrl: '', category: '',
  });
  const [createProperty, { isLoading, error }] = useCreatePropertyMutation();
  const { data: categories } = useGetCategoriesQuery();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        bedrooms: Number(form.bedrooms) || 0,
        bathrooms: Number(form.bathrooms) || 0,
        category: form.category || undefined,
      };
      const property = await createProperty(payload).unwrap();
      navigate(`/properties/${property._id}`);
    } catch (err) {
      // surfaced below
    }
  };

  return (
    <div className="page container">
      <div className="card form" style={{ maxWidth: 500 }}>
        <h2>List a New Property</h2>
        {error && <p className="error">{error.data?.message || 'Failed to create listing'}</p>}
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input name="title" value={form.title} onChange={handleChange} required />
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} required />
          <label>Price ($)</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} required />
          <label>Location</label>
          <input name="location" value={form.location} onChange={handleChange} required />
          <label>Bedrooms</label>
          <input type="number" name="bedrooms" value={form.bedrooms} onChange={handleChange} />
          <label>Bathrooms</label>
          <input type="number" name="bathrooms" value={form.bathrooms} onChange={handleChange} />
          <label>Image URL</label>
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://..." />
          <label>Category</label>
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="">None</option>
            {categories?.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading ? 'Publishing...' : 'Publish Listing'}
          </button>
        </form>
      </div>
    </div>
  );
}
