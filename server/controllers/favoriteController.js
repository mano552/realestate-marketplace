import Favorite from '../models/Favorite.js';

export const getMyFavorites = async (req, res) => {
  const favorites = await Favorite.find({ user: req.user._id }).populate('property');
  res.json(favorites);
};

export const addFavorite = async (req, res) => {
  try {
    const { property } = req.body;
    if (!property) return res.status(400).json({ message: 'Property is required' });
    const favorite = await Favorite.create({ user: req.user._id, property });
    res.status(201).json(favorite);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Property already in favorites' });
    }
    res.status(400).json({ message: err.message });
  }
};

export const removeFavorite = async (req, res) => {
  const favorite = await Favorite.findById(req.params.id);
  if (!favorite) return res.status(404).json({ message: 'Favorite not found' });
  if (favorite.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized to remove this favorite' });
  }
  await favorite.deleteOne();
  res.json({ message: 'Removed from favorites' });
};
