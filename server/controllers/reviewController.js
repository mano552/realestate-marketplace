import Review from '../models/Review.js';
import { isOwner } from '../middleware/auth.js';

// Public: get all reviews for a property
export const getReviewsForProperty = async (req, res) => {
  const reviews = await Review.find({ property: req.params.propertyId })
    .populate('user', 'name')
    .sort('-createdAt');
  res.json(reviews);
};

export const createReview = async (req, res) => {
  try {
    const { property, rating, comment } = req.body;
    if (!property || !rating) {
      return res.status(400).json({ message: 'Property and rating are required' });
    }
    const review = await Review.create({ property, rating, comment, user: req.user._id });
    const populated = await review.populate('user', 'name');
    res.status(201).json(populated);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'You already reviewed this property' });
    }
    res.status(400).json({ message: err.message });
  }
};

export const updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found' });
  if (!isOwner(review.user, req.user._id)) {
    return res.status(403).json({ message: 'Not authorized to edit this review' });
  }
  Object.assign(review, req.body);
  await review.save();
  res.json(review);
};

export const deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found' });
  if (!isOwner(review.user, req.user._id)) {
    return res.status(403).json({ message: 'Not authorized to delete this review' });
  }
  await review.deleteOne();
  res.json({ message: 'Review deleted' });
};
