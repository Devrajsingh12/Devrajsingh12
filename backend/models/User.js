const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  isPandit: {
    type: Boolean,
    default: false
  },
  profile: {
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot be more than 500 characters']
    },
    contact: {
      phone: {
        type: String,
        match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number']
      },
      address: {
        street: String,
        city: String,
        state: String,
        pincode: String
      }
    },
    expertise: [{
      type: String,
      enum: ['Wedding Ceremonies', 'Puja Services', 'Havan', 'Griha Pravesh', 'Astrology', 'Other']
    }],
    experience: {
      type: Number,
      min: 0
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalBookings: {
      type: Number,
      default: 0
    },
    availability: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Get user without password
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);