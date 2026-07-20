import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} from '../features/categories/categoriesApi.js';
import { selectCurrentUser } from '../features/auth/authSlice.js';

export default function Categories() {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [createCategory, { error }] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const user = useSelector(selectCurrentUser);
  const [form, setForm] = useState({ name: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCategory(form);
    setForm({ name: '', description: '' });
  };

  return (
    <div className="page container">
      <h2>Categories</h2>
      <div className="card form" style={{ maxWidth: '100%' }}>
        <h3>Add a category</h3>
        {error && <p className="error">{error.data?.message}</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            style={{ flex: 1 }}
          />
          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            style={{ flex: 2 }}
          />
          <button className="btn" type="submit">Add</button>
        </form>
      </div>

      {isLoading && <p>Loading categories...</p>}
      <div className="grid">
        {categories?.map((c) => (
          <div key={c._id} className="card">
            <h3>{c.name}</h3>
            <p className="muted">{c.description}</p>
            {user && c.createdBy === user.id && (
              <button className="btn danger" onClick={() => deleteCategory(c._id)}>Delete</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
