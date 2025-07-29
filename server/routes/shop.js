const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth } = require('../middleware/auth');
const Product = require('../models/Product');

const router = express.Router();

// @route   GET /api/shop/products
// @desc    Get all products
// @access  Public
router.get('/products', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = { isAvailable: true };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/shop/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   GET /api/shop/categories
// @desc    Get all product categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Initialize some sample products if none exist
router.post('/init-products', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    if (count > 0) {
      return res.json({ message: 'Products already exist' });
    }

    const sampleProducts = [
      {
        name: 'Brass Diya Set',
        description: 'Traditional brass oil lamps for daily worship and festivals',
        price: 299,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        category: 'puja-items',
        stock: 50
      },
      {
        name: 'Sandalwood Incense Sticks',
        description: 'Pure sandalwood incense sticks for peaceful prayers',
        price: 149,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        category: 'incense',
        stock: 100
      },
      {
        name: 'Bhagavad Gita Book',
        description: 'Complete Hindi and English translation of the sacred text',
        price: 199,
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        category: 'books',
        stock: 30
      },
      {
        name: 'Marigold Garland',
        description: 'Fresh marigold flower garland for temple decoration',
        price: 99,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        category: 'decorations',
        stock: 25
      },
      {
        name: 'Coconut for Offering',
        description: 'Fresh coconuts perfect for religious offerings',
        price: 49,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        category: 'offerings',
        stock: 75
      },
      {
        name: 'Camphor Tablets',
        description: 'Pure camphor tablets for aarti and prayers',
        price: 79,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        category: 'puja-items',
        stock: 60
      }
    ];

    await Product.insertMany(sampleProducts);
    res.json({ message: 'Sample products created successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;