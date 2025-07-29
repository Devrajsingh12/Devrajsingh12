const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  isPandit: {
    type: Boolean,
    default: false
  },
  profile: {
    bio: {
      type: String,
      default: ''
    },
    contact: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    services: [{
      type: String
    }],
    experience: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0
    },
    avatar: {
      type: String,
      default: ''
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);