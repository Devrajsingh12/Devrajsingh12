const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  pandit: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  service: {
    type: String,
    required: [true, 'Please specify the service'],
    enum: ['Wedding Ceremonies', 'Puja Services', 'Havan', 'Griha Pravesh', 'Astrology', 'Other']
  },
  date: {
    type: Date,
    required: [true, 'Please provide the service date'],
    validate: {
      validator: function(date) {
        return date > new Date();
      },
      message: 'Service date must be in the future'
    }
  },
  time: {
    type: String,
    required: [true, 'Please provide the service time']
  },
  duration: {
    type: Number,
    required: [true, 'Please provide the estimated duration in hours'],
    min: 1,
    max: 12
  },
  location: {
    address: {
      type: String,
      required: [true, 'Please provide the service address']
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true,
      match: [/^\d{6}$/, 'Please provide a valid 6-digit pincode']
    }
  },
  requirements: {
    type: String,
    maxlength: [1000, 'Requirements cannot be more than 1000 characters']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'rejected'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  }
}, {
  timestamps: true
});

// Populate user and pandit info
bookingSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name email profile.contact'
  }).populate({
    path: 'pandit',
    select: 'name email profile.contact profile.expertise profile.rating'
  });
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);