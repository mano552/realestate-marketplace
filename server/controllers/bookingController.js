import Booking from '../models/Booking.js';
import Property from '../models/Property.js';
import { isOwner } from '../middleware/auth.js';

// Bookings made by the logged-in user
export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('property', 'title location price imageUrl')
    .sort('-createdAt');
  res.json(bookings);
};

// Bookings received for properties the logged-in user owns
export const getBookingsForMyProperties = async (req, res) => {
  const myProperties = await Property.find({ owner: req.user._id }).select('_id');
  const propertyIds = myProperties.map((p) => p._id);

  const bookings = await Booking.find({ property: { $in: propertyIds } })
    .populate('property', 'title location')
    .populate('user', 'name email')
    .sort('-createdAt');

  res.json(bookings);
};

export const createBooking = async (req, res) => {
  try {
    const { property, visitDate, message } = req.body;
    if (!property || !visitDate) {
      return res.status(400).json({ message: 'Property and visitDate are required' });
    }
    const booking = await Booking.create({ property, visitDate, message, user: req.user._id });
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  if (!isOwner(booking.user, req.user._id)) {
    return res.status(403).json({ message: 'Not authorized to edit this booking' });
  }
  Object.assign(booking, req.body);
  await booking.save();
  res.json(booking);
};

export const deleteBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  if (!isOwner(booking.user, req.user._id)) {
    return res.status(403).json({ message: 'Not authorized to cancel this booking' });
  }
  await booking.deleteOne();
  res.json({ message: 'Booking cancelled' });
};
