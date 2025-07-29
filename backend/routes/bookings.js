const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all pandits
// @route   GET /api/bookings/pandits
// @access  Public
router.get('/pandits', async (req, res) => {
  try {
    const { service, city, page = 1, limit = 10 } = req.query;
    
    let query = { isPandit: true, 'profile.availability': true };
    
    if (service) {
      query['profile.expertise'] = service;
    }
    
    if (city) {
      query['profile.contact.address.city'] = new RegExp(city, 'i');
    }

    const pandits = await User.find(query)
      .select('name email profile')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ 'profile.rating': -1, 'profile.totalBookings': -1 });

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      count: pandits.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: pandits
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Private (Users only)
router.post('/', protect, authorize('user'), [
  body('pandit').isMongoId().withMessage('Valid pandit ID is required'),
  body('service').notEmpty().withMessage('Service is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('time').notEmpty().withMessage('Time is required'),
  body('duration').isInt({ min: 1, max: 12 }).withMessage('Duration must be between 1-12 hours'),
  body('location.address').notEmpty().withMessage('Address is required'),
  body('location.city').notEmpty().withMessage('City is required'),
  body('location.state').notEmpty().withMessage('State is required'),
  body('location.pincode').matches(/^\d{6}$/).withMessage('Valid 6-digit pincode is required'),
  body('price').isFloat({ min: 0 }).withMessage('Valid price is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { pandit: panditId, service, date, time, duration, location, requirements, price } = req.body;

    // Check if pandit exists and is available
    const pandit = await User.findOne({ _id: panditId, isPandit: true, 'profile.availability': true });
    if (!pandit) {
      return res.status(404).json({
        success: false,
        message: 'Pandit not found or not available'
      });
    }

    // Check if pandit has the required expertise
    if (!pandit.profile.expertise.includes(service)) {
      return res.status(400).json({
        success: false,
        message: 'Pandit does not provide this service'
      });
    }

    // Create booking
    const booking = await Booking.create({
      user: req.user.id,
      pandit: panditId,
      service,
      date,
      time,
      duration,
      location,
      requirements,
      price
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Get user's bookings
// @route   GET /api/bookings/my-bookings
// @access  Private (Users only)
router.get('/my-bookings', protect, authorize('user'), async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let query = { user: req.user.id };
    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      count: bookings.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: bookings
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Get pandit's booking requests
// @route   GET /api/bookings/requests
// @access  Private (Pandits only)
router.get('/requests', protect, authorize('pandit'), async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let query = { pandit: req.user.id };
    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      count: bookings.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: bookings
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private (Pandits only)
router.put('/:id/status', protect, authorize('pandit'), [
  body('status').isIn(['confirmed', 'rejected', 'completed']).withMessage('Valid status is required'),
  body('notes').optional().isLength({ max: 500 }).withMessage('Notes cannot exceed 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { status, notes } = req.body;

    const booking = await Booking.findOne({ _id: req.params.id, pandit: req.user.id });
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    booking.status = status;
    if (notes) booking.notes = notes;
    
    // Update pandit's total bookings if confirmed
    if (status === 'confirmed' && booking.status !== 'confirmed') {
      await User.findByIdAndUpdate(req.user.id, {
        $inc: { 'profile.totalBookings': 1 }
      });
    }

    await booking.save();

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns the booking or is the assigned pandit
    if (booking.user._id.toString() !== req.user.id && booking.pandit._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this booking'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;