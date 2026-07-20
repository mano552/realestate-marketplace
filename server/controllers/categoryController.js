import Category from '../models/Category.js';
import { isOwner } from '../middleware/auth.js';

export const getCategories = async (req, res) => {
  const categories = await Category.find().sort('-createdAt');
  res.json(categories);
};

export const getCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: 'Category not found' });
  res.json(category);
};

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    const category = await Category.create({ name, description, createdBy: req.user._id });
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: 'Category not found' });
  if (!isOwner(category.createdBy, req.user._id)) {
    return res.status(403).json({ message: 'Not authorized to edit this category' });
  }
  Object.assign(category, req.body);
  await category.save();
  res.json(category);
};

export const deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: 'Category not found' });
  if (!isOwner(category.createdBy, req.user._id)) {
    return res.status(403).json({ message: 'Not authorized to delete this category' });
  }
  await category.deleteOne();
  res.json({ message: 'Category deleted' });
};
