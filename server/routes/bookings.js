const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth, isPandit } = require('../middleware/auth');
const Booking = require('../models/Booking');
const User = require('../models/User');

const router = express.Router();

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Private
router.post('/', [
  auth,
  body('pandit').notEmpty().withMessage('Pandit is required'),
  body('service').notEmpty().withMessage('Service is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('time').notEmpty().withMessage('Time is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('price').isNumeric().withMessage('Price must be a number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { pandit, service, date, time, location, notes, price } = req.body;

    // Check if pandit exists and is actually a pandit
    const panditUser = await User.findById(pandit);
    if (!panditUser || !panditUser.isPandit) {
      return res.status(400).json({ message: 'Invalid pandit selected' });
    }

    const booking = new Booking({
      user: req.user.id,
      pandit,
      service,
      date,
      time,
      location,
      notes,
      price
    });

    await booking.save();
    
    const populatedBooking = await Booking.findById(booking.id)
      .populate('user', 'name email')
      .populate('pandit', 'name email profile');

    res.json(populatedBooking);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/bookings
// @desc    Get user's bookings
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const query = req.user.isPandit 
      ? { pandit: req.user.id }
      : { user: req.user.id };

    const bookings = await Booking.find(query)
      .populate('user', 'name email')
      .populate('pandit', 'name email profile')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/bookings/:id/status
// @desc    Update booking status (Pandits only)
// @access  Private
router.put('/:id/status', [auth, isPandit], async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.pandit.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    booking.status = status;
    await booking.save();

    const populatedBooking = await Booking.findById(booking.id)
      .populate('user', 'name email')
      .populate('pandit', 'name email profile');

    res.json(populatedBooking);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/bookings/:id
// @desc    Get booking by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email')
      .populate('pandit', 'name email profile');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is authorized to view this booking
    if (booking.user._id.toString() !== req.user.id && 
        booking.pandit._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(booking);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;