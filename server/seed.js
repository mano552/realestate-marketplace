import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import User from './models/User.js';
import Category from './models/Category.js';
import Property from './models/Property.js';
import Review from './models/Review.js';

dotenv.config();

const demoUsers = [
  { name: 'Ayesha Khan', email: 'ayesha@demo.com', password: 'password123' },
  { name: 'Bilal Ahmed', email: 'bilal@demo.com', password: 'password123' },
  { name: 'Sara Malik', email: 'sara@demo.com', password: 'password123' },
];

const categoryNames = [
  { name: 'Apartment', description: 'Modern apartments and flats' },
  { name: 'House', description: 'Independent houses and villas' },
  { name: 'Studio', description: 'Compact studio units' },
  { name: 'Commercial', description: 'Offices and commercial spaces' },
];

const propertyTemplates = [
  {
    title: 'Modern 3-Bed Apartment in DHA Phase 6',
    description: 'A bright, freshly renovated apartment with an open living area, modern kitchen, and a balcony overlooking the park. Close to schools and shopping centers.',
    price: 45000000,
    location: 'DHA Phase 6, Lahore',
    bedrooms: 3,
    bathrooms: 2,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    category: 'Apartment',
  },
  {
    title: 'Cozy Studio Near Gulberg',
    description: 'Perfect for singles or students. Fully furnished studio with a compact kitchenette, fast internet, and 24/7 security.',
    price: 12000000,
    location: 'Gulberg III, Lahore',
    bedrooms: 1,
    bathrooms: 1,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    category: 'Studio',
  },
  {
    title: 'Spacious 5-Bed Villa with Garden',
    description: 'A stunning double-story villa featuring a private garden, servant quarters, and a large driveway. Ideal for families.',
    price: 120000000,
    location: 'Bahria Town, Lahore',
    bedrooms: 5,
    bathrooms: 4,
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
    category: 'House',
  },
  {
    title: 'Downtown Commercial Office Space',
    description: 'Prime location office space, ready to move in, with dedicated parking and conference rooms. Great for startups and agencies.',
    price: 30000000,
    location: 'Blue Area, Islamabad',
    bedrooms: 0,
    bathrooms: 2,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    category: 'Commercial',
  },
  {
    title: 'Elegant 2-Bed Apartment with City View',
    description: 'High-floor apartment with panoramic city views, modern fittings, and access to a rooftop pool and gym.',
    price: 32000000,
    location: 'Clifton, Karachi',
    bedrooms: 2,
    bathrooms: 2,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    category: 'Apartment',
  },
  {
    title: 'Charming Bungalow near Model Town Park',
    description: 'A quiet, tree-lined street bungalow with a large lawn, perfect for family gatherings and evening walks nearby.',
    price: 85000000,
    location: 'Model Town, Lahore',
    bedrooms: 4,
    bathrooms: 3,
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
    category: 'House',
  },
  {
    title: 'Affordable Studio for Students',
    description: 'Budget-friendly studio close to major universities, with shared laundry facilities and a quiet study corner.',
    price: 8000000,
    location: 'Johar Town, Lahore',
    bedrooms: 1,
    bathrooms: 1,
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800',
    category: 'Studio',
  },
  {
    title: 'Luxury Penthouse with Rooftop Terrace',
    description: 'A one-of-a-kind penthouse with a private rooftop terrace, jacuzzi, and 360-degree skyline views.',
    price: 250000000,
    location: 'F-7, Islamabad',
    bedrooms: 4,
    bathrooms: 4,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    category: 'Apartment',
  },
  {
    title: 'Retail Shop on Main Boulevard',
    description: 'High-footfall retail space on the main boulevard, ideal for a showroom or flagship store.',
    price: 40000000,
    location: 'Main Boulevard, Gulberg, Lahore',
    bedrooms: 0,
    bathrooms: 1,
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    category: 'Commercial',
  },
  {
    title: 'Family House with Pool',
    description: 'A generously sized family home with an in-ground pool, home theater room, and a two-car garage.',
    price: 150000000,
    location: 'DHA Phase 8, Karachi',
    bedrooms: 5,
    bathrooms: 5,
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800',
    category: 'House',
  },
  {
    title: 'Minimalist 1-Bed Apartment',
    description: 'A minimalist, well-lit apartment with all appliances included, walking distance from cafes and public transport.',
    price: 18000000,
    location: 'E-11, Islamabad',
    bedrooms: 1,
    bathrooms: 1,
    imageUrl: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800',
    category: 'Apartment',
  },
  {
    title: 'Corner House with Extra Parking',
    description: 'Corner-plot house with extra parking space, recently painted, with a modular kitchen and marble flooring.',
    price: 60000000,
    location: 'Askari 10, Lahore',
    bedrooms: 3,
    bathrooms: 3,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    category: 'House',
  },
  {
    title: 'Beachside Apartment with Sea View',
    description: 'A relaxing 2-bed apartment steps away from the beach, with a private balcony overlooking the water.',
    price: 42000000,
    location: 'Clifton Block 2, Karachi',
    bedrooms: 2,
    bathrooms: 2,
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
    category: 'Apartment',
  },
  {
    title: 'Twin House in Gated Community',
    description: 'A well-maintained twin house inside a secure gated community with 24/7 patrolling and a shared park.',
    price: 70000000,
    location: 'Bahria Town Phase 4, Rawalpindi',
    bedrooms: 4,
    bathrooms: 3,
    imageUrl: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800',
    category: 'House',
  },
  {
    title: 'Compact Studio with Rooftop Access',
    description: 'A smartly designed studio with shared rooftop access, ideal for young professionals working nearby.',
    price: 9500000,
    location: 'Faisal Town, Lahore',
    bedrooms: 1,
    bathrooms: 1,
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
    category: 'Studio',
  },
  {
    title: 'Warehouse & Office Combo Unit',
    description: 'A versatile commercial unit combining warehouse storage and office space, close to the ring road.',
    price: 55000000,
    location: 'Sundar Industrial Estate, Lahore',
    bedrooms: 0,
    bathrooms: 2,
    imageUrl: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800',
    category: 'Commercial',
  },
  {
    title: 'Hilltop Cottage with Mountain Views',
    description: 'A peaceful cottage surrounded by pine trees, perfect as a weekend getaway or a quiet full-time residence.',
    price: 38000000,
    location: 'Bhurban, Murree',
    bedrooms: 3,
    bathrooms: 2,
    imageUrl: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800',
    category: 'House',
  },
  {
    title: 'Contemporary 3-Bed with Home Office',
    description: 'A thoughtfully designed apartment with a dedicated home-office nook, fiber internet ready, and covered parking.',
    price: 51000000,
    location: 'Wapda Town, Lahore',
    bedrooms: 3,
    bathrooms: 2,
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    category: 'Apartment',
  },
  {
    title: 'Boutique Retail Unit in Mall',
    description: 'A ready-to-fit-out retail unit on the ground floor of a busy shopping mall with high visitor footfall.',
    price: 28000000,
    location: 'Packages Mall, Lahore',
    bedrooms: 0,
    bathrooms: 1,
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    category: 'Commercial',
  },
  {
    title: 'Sunlit Studio Near the University',
    description: 'A bright, quiet studio just a 10-minute walk from campus, with a small reading nook by the window.',
    price: 7500000,
    location: 'Township, Lahore',
    bedrooms: 1,
    bathrooms: 1,
    imageUrl: 'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800',
    category: 'Studio',
  },
  {
    title: 'Duplex Home with Rooftop Garden',
    description: 'A duplex home featuring a lush rooftop garden, ideal for evening tea and weekend barbecues with family.',
    price: 95000000,
    location: 'DHA Phase 2, Islamabad',
    bedrooms: 4,
    bathrooms: 4,
    imageUrl: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
    category: 'House',
  },
  {
    title: 'High-Rise 2-Bed with Gym & Pool Access',
    description: 'A modern high-rise unit with building amenities including a gym, swimming pool, and 24/7 concierge.',
    price: 36000000,
    location: 'Emaar Canyon Views, Islamabad',
    bedrooms: 2,
    bathrooms: 2,
    imageUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800',
    category: 'Apartment',
  },
  {
    title: 'Corner Plot Bungalow with Guest House',
    description: 'A large bungalow on a corner plot with a separate guest house, mature garden, and covered veranda.',
    price: 135000000,
    location: 'Cavalry Ground, Lahore',
    bedrooms: 5,
    bathrooms: 5,
    imageUrl: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
    category: 'House',
  },
];

const reviewComments = [
  { rating: 5, comment: 'Loved the location and the place was exactly as described!' },
  { rating: 4, comment: 'Great value for money, minor issues with the kitchen fittings.' },
  { rating: 5, comment: 'The owner was very responsive and the visit was smooth.' },
  { rating: 3, comment: 'Decent place but a bit noisy at night.' },
];

const seed = async () => {
  await connectDB();
  console.log('Connected. Seeding data...');

  // Clear existing demo-relevant collections (safe for a fresh dev database)
  await Promise.all([
    Review.deleteMany({}),
    Property.deleteMany({}),
    Category.deleteMany({}),
  ]);

  // Create (or reuse) demo users
  const users = [];
  for (const u of demoUsers) {
    let user = await User.findOne({ email: u.email });
    if (!user) user = await User.create(u);
    users.push(user);
  }

  // Create categories
  const categories = {};
  for (const c of categoryNames) {
    const category = await Category.create({ ...c, createdBy: users[0]._id });
    categories[c.name] = category;
  }

  // Create properties, assigning owners round-robin
  const properties = [];
  for (let i = 0; i < propertyTemplates.length; i++) {
    const t = propertyTemplates[i];
    const owner = users[i % users.length];
    const property = await Property.create({
      title: t.title,
      description: t.description,
      price: t.price,
      location: t.location,
      bedrooms: t.bedrooms,
      bathrooms: t.bathrooms,
      imageUrl: t.imageUrl,
      category: categories[t.category]._id,
      owner: owner._id,
    });
    properties.push(property);
  }

  // Create a couple of reviews per property from other users
  for (const property of properties) {
    const reviewers = users.filter((u) => u._id.toString() !== property.owner.toString());
    const count = 1 + Math.floor(Math.random() * 2); // 1-2 reviews
    for (let i = 0; i < count; i++) {
      const reviewer = reviewers[i % reviewers.length];
      const r = reviewComments[Math.floor(Math.random() * reviewComments.length)];
      try {
        await Review.create({
          property: property._id,
          user: reviewer._id,
          rating: r.rating,
          comment: r.comment,
        });
      } catch (err) {
        // ignore duplicate (unique index on property+user)
      }
    }
  }

  console.log(`Seeded: ${users.length} users, ${Object.keys(categories).length} categories, ${properties.length} properties, plus reviews.`);
  console.log('Demo login: ayesha@demo.com / password123');
  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
