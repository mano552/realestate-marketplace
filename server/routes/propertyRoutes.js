import express from 'express';
import {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getMyProperties,
} from '../controllers/propertyController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProperties);
router.get('/mine', protect, getMyProperties);
router.get('/:id', getProperty);
router.post('/', protect, createProperty);
router.put('/:id', protect, updateProperty);
router.delete('/:id', protect, deleteProperty);

export default router;
