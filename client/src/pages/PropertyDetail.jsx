import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetPropertyQuery } from '../features/properties/propertiesApi.js';
import {
  useGetReviewsForPropertyQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
} from '../features/reviews/reviewsApi.js';
import { useCreateBookingMutation } from '../features/bookings/bookingsApi.js';
import { useAddFavoriteMutation } from '../features/favorites/favoritesApi.js';
import { selectCurrentUser, selectIsAuthenticated } from '../features/auth/authSlice.js';

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const { data: property, isLoading } = useGetPropertyQuery(id);
  const { data: reviews } = useGetReviewsForPropertyQuery(id);
  const [createReview] = useCreateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const [createBooking] = useCreateBookingMutation();
  const [addFavorite] = useAddFavoriteMutation();

  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [bookingForm, setBookingForm] = useState({ visitDate: '', message: '' });
  const [notice, setNotice] = useState('');

  if (isLoading) return <p className="container">Loading...</p>;
  if (!property) return <p className="container">Property not found.</p>;

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    await createReview({ property: id, ...reviewForm });
    setReviewForm({ rating: 5, comment: '' });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    await createBooking({ property: id, ...bookingForm });
    setNotice('Visit request sent!');
    setBookingForm({ visitDate: '', message: '' });
  };

  const handleFavorite = async () => {
    await addFavorite({ property: id });
    setNotice('Added to favorites!');
  };

  return (
    <div className="page container">
      <button className="back-link" onClick={() => navigate(-1)}>
        ← Back to listings
      </button>
      <div className="card">
        <img
          className="property-img"
          style={{ height: 320 }}
          src={property.imageUrl || 'https://placehold.co/800x400?text=Property'}
          alt={property.title}
        />
        <h2>{property.title}</h2>
        <p className="muted">{property.location}</p>
        <p className="price">${property.price.toLocaleString()}</p>
        <span className="badge">{property.bedrooms} bedrooms</span>
        <span className="badge">{property.bathrooms} bathrooms</span>
        <p>{property.description}</p>
        <p className="muted">Listed by {property.owner?.name}</p>
        {isAuthenticated && (
          <button className="btn secondary" onClick={handleFavorite}>♥ Save to Favorites</button>
        )}
        {notice && <p className="muted">{notice}</p>}
      </div>

      {isAuthenticated && (
        <div className="card">
          <h3>Request a visit</h3>
          <form className="form" onSubmit={handleBookingSubmit} style={{ maxWidth: '100%' }}>
            <label>Visit date</label>
            <input
              type="date"
              value={bookingForm.visitDate}
              onChange={(e) => setBookingForm({ ...bookingForm, visitDate: e.target.value })}
              required
            />
            <label>Message (optional)</label>
            <textarea
              value={bookingForm.message}
              onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
              rows={3}
            />
            <button className="btn" type="submit">Request Visit</button>
          </form>
        </div>
      )}

      <div className="card">
        <h3>Reviews</h3>
        {reviews?.length === 0 && <p className="muted">No reviews yet.</p>}
        {reviews?.map((r) => (
          <div key={r._id} className="card" style={{ background: '#fafafa' }}>
            <strong>{r.user?.name}</strong> — {'⭐'.repeat(r.rating)}
            <p>{r.comment}</p>
            {user && r.user?._id === user.id && (
              <button className="btn danger" onClick={() => deleteReview(r._id)}>Delete</button>
            )}
          </div>
        ))}

        {isAuthenticated && (
          <form className="form" onSubmit={handleReviewSubmit} style={{ maxWidth: '100%', marginTop: 16 }}>
            <label>Rating</label>
            <select
              value={reviewForm.rating}
              onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>{n} stars</option>
              ))}
            </select>
            <label>Comment</label>
            <textarea
              value={reviewForm.comment}
              onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
              rows={2}
            />
            <button className="btn" type="submit">Submit Review</button>
          </form>
        )}
      </div>
    </div>
  );
}
