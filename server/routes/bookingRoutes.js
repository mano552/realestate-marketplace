import express from 'express';
import {
  getMyBookings,
  getBookingsForMyProperties,
  createBooking,
  updateBooking,
  deleteBooking,
} from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/mine', protect, getMyBookings);
router.get('/received', protect, getBookingsForMyProperties);
router.post('/', protect, createBooking);
router.put('/:id', protect, updateBooking);
router.delete('/:id', protect, deleteBooking);

export default router;
