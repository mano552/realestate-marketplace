import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetMyPropertiesQuery, useDeletePropertyMutation } from '../features/properties/propertiesApi.js';
import { useGetMyBookingsQuery, useGetBookingsReceivedQuery, useDeleteBookingMutation } from '../features/bookings/bookingsApi.js';
import { useGetMyFavoritesQuery, useRemoveFavoriteMutation } from '../features/favorites/favoritesApi.js';

const TABS = ['My Listings', 'My Bookings', 'Booking Requests', 'My Favorites'];

export default function Dashboard() {
  const [tab, setTab] = useState(TABS[0]);

  const { data: myProperties } = useGetMyPropertiesQuery();
  const [deleteProperty] = useDeletePropertyMutation();

  const { data: myBookings } = useGetMyBookingsQuery();
  const { data: receivedBookings } = useGetBookingsReceivedQuery();
  const [deleteBooking] = useDeleteBookingMutation();

  const { data: favorites } = useGetMyFavoritesQuery();
  const [removeFavorite] = useRemoveFavoriteMutation();

  return (
    <div className="page container">
      <h2>Dashboard</h2>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        {TABS.map((t) => (
          <button
            key={t}
            className={tab === t ? 'btn' : 'btn secondary'}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'My Listings' && (
        <div className="grid">
          {myProperties?.length === 0 && <p className="muted">You haven't listed any properties yet.</p>}
          {myProperties?.map((p) => (
            <div key={p._id} className="card">
              <h3>{p.title}</h3>
              <p className="muted">{p.location}</p>
              <p className="price">${p.price.toLocaleString()}</p>
              <Link className="btn secondary" to={`/properties/${p._id}`}>View</Link>{' '}
              <button className="btn danger" onClick={() => deleteProperty(p._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'My Bookings' && (
        <div className="grid">
          {myBookings?.length === 0 && <p className="muted">No visit requests yet.</p>}
          {myBookings?.map((b) => (
            <div key={b._id} className="card">
              <h3>{b.property?.title}</h3>
              <p className="muted">Visit date: {new Date(b.visitDate).toLocaleDateString()}</p>
              <p className="badge">{b.status}</p>
              <p>{b.message}</p>
              <button className="btn danger" onClick={() => deleteBooking(b._id)}>Cancel</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'Booking Requests' && (
        <div className="grid">
          {receivedBookings?.length === 0 && <p className="muted">No booking requests for your properties.</p>}
          {receivedBookings?.map((b) => (
            <div key={b._id} className="card">
              <h3>{b.property?.title}</h3>
              <p className="muted">Requested by {b.user?.name} ({b.user?.email})</p>
              <p className="muted">Visit date: {new Date(b.visitDate).toLocaleDateString()}</p>
              <p className="badge">{b.status}</p>
              <p>{b.message}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'My Favorites' && (
        <div className="grid">
          {favorites?.length === 0 && <p className="muted">No favorites saved yet.</p>}
          {favorites?.map((f) => (
            <div key={f._id} className="card">
              <h3>{f.property?.title}</h3>
              <p className="muted">{f.property?.location}</p>
              <p className="price">${f.property?.price?.toLocaleString()}</p>
              <Link className="btn secondary" to={`/properties/${f.property?._id}`}>View</Link>{' '}
              <button className="btn danger" onClick={() => removeFavorite(f._id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
