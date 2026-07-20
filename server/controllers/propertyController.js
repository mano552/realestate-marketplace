import Property from '../models/Property.js';
import { isOwner } from '../middleware/auth.js';

// Public: list properties with optional filters (?location=&minPrice=&maxPrice=&category=)
export const getProperties = async (req, res) => {
  const { location, minPrice, maxPrice, category } = req.query;
  const filter = {};

  if (location) filter.location = { $regex: location, $options: 'i' };
  if (category) filter.category = category;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const properties = await Property.find(filter)
    .populate('category', 'name')
    .populate('owner', 'name email')
    .sort('-createdAt');

  res.json(properties);
};

export const getProperty = async (req, res) => {
  const property = await Property.findById(req.params.id)
    .populate('category', 'name')
    .populate('owner', 'name email');
  if (!property) return res.status(404).json({ message: 'Property not found' });
  res.json(property);
};

export const createProperty = async (req, res) => {
  try {
    const property = await Property.create({ ...req.body, owner: req.user._id });
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateProperty = async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) return res.status(404).json({ message: 'Property not found' });
  if (!isOwner(property.owner, req.user._id)) {
    return res.status(403).json({ message: 'Not authorized to edit this property' });
  }
  Object.assign(property, req.body);
  await property.save();
  res.json(property);
};

export const deleteProperty = async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) return res.status(404).json({ message: 'Property not found' });
  if (!isOwner(property.owner, req.user._id)) {
    return res.status(403).json({ message: 'Not authorized to delete this property' });
  }
  await property.deleteOne();
  res.json({ message: 'Property deleted' });
};

// My listings (protected)
export const getMyProperties = async (req, res) => {
  const properties = await Property.find({ owner: req.user._id }).sort('-createdAt');
  res.json(properties);
};
