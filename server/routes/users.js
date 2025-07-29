const express = require('express');
const { auth } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// @route   GET /api/users/pandits
// @desc    Get all pandits
// @access  Public
router.get('/pandits', async (req, res) => {
  try {
    const pandits = await User.find({ isPandit: true })
      .select('-password')
      .sort({ 'profile.rating': -1 });
    
    res.json(pandits);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const { bio, contact, location, services, experience, avatar } = req.body;
    
    const user = await User.findById(req.user.id);
    
    if (bio !== undefined) user.profile.bio = bio;
    if (contact !== undefined) user.profile.contact = contact;
    if (location !== undefined) user.profile.location = location;
    if (services !== undefined) user.profile.services = services;
    if (experience !== undefined) user.profile.experience = experience;
    if (avatar !== undefined) user.profile.avatar = avatar;
    
    await user.save();
    
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/users/profile/:id
// @desc    Get user profile by ID
// @access  Public
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;