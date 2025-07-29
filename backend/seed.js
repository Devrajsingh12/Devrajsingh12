const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Product = require('./models/Product');

// Sample data
const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@panditji.com',
    password: 'admin123',
    isPandit: false
  },
  {
    name: 'Pandit Rajesh Sharma',
    email: 'rajesh@panditji.com',
    password: 'pandit123',
    isPandit: true,
    profile: {
      bio: 'Experienced Pandit with 15+ years in performing various Hindu ceremonies and rituals.',
      contact: {
        phone: '9876543210',
        address: {
          street: '123 Temple Street',
          city: 'New Delhi',
          state: 'Delhi',
          pincode: '110001'
        }
      },
      expertise: ['Wedding Ceremonies', 'Puja Services', 'Havan'],
      experience: 15,
      rating: 4.8,
      totalBookings: 150,
      availability: true
    }
  },
  {
    name: 'Pandit Vikram Tiwari',
    email: 'vikram@panditji.com',
    password: 'pandit123',
    isPandit: true,
    profile: {
      bio: 'Specialized in Vedic astrology and traditional ceremonies. Expert in Griha Pravesh and marriage rituals.',
      contact: {
        phone: '9876543211',
        address: {
          street: '456 Ashram Road',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001'
        }
      },
      expertise: ['Astrology', 'Griha Pravesh', 'Wedding Ceremonies'],
      experience: 20,
      rating: 4.9,
      totalBookings: 200,
      availability: true
    }
  },
  {
    name: 'Test User',
    email: 'user@panditji.com',
    password: 'user123',
    isPandit: false,
    profile: {
      bio: 'Regular user looking for spiritual services',
      contact: {
        phone: '9876543212',
        address: {
          street: '789 Main Street',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560001'
        }
      }
    }
  }
];

const sampleProducts = [
  {
    name: 'Brass Diya Set (Pack of 12)',
    description: 'Beautiful handcrafted brass diyas perfect for festivals and daily prayers. Made from pure brass with intricate designs.',
    price: 499,
    category: 'Puja Items',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    stock: 50,
    featured: true,
    rating: { average: 4.5, count: 25 },
    tags: ['diya', 'brass', 'festival', 'puja']
  },
  {
    name: 'Sandalwood Incense Sticks',
    description: 'Premium quality sandalwood incense sticks for meditation and prayers. Pack of 100 sticks with natural fragrance.',
    price: 199,
    category: 'Incense & Dhoop',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    stock: 100,
    featured: true,
    rating: { average: 4.7, count: 45 },
    tags: ['incense', 'sandalwood', 'meditation', 'natural']
  },
  {
    name: 'Ganesha Marble Statue',
    description: 'Exquisite white marble Ganesha statue, hand-carved by skilled artisans. Perfect for home temple or office.',
    price: 2499,
    category: 'Idols & Statues',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    stock: 20,
    featured: true,
    rating: { average: 4.9, count: 15 },
    tags: ['ganesha', 'marble', 'statue', 'handcrafted']
  },
  {
    name: 'Bhagavad Gita (Hindi & English)',
    description: 'Complete Bhagavad Gita with Hindi and English translation. Hardcover edition with beautiful illustrations.',
    price: 599,
    category: 'Books & Scriptures',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    stock: 75,
    featured: false,
    rating: { average: 4.6, count: 30 },
    tags: ['bhagavad gita', 'book', 'scripture', 'religious']
  },
  {
    name: 'Rudraksha Mala (108 Beads)',
    description: 'Authentic 5-mukhi Rudraksha mala with 108 beads. Blessed and energized for spiritual practices.',
    price: 899,
    category: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
    stock: 30,
    featured: true,
    rating: { average: 4.8, count: 20 },
    tags: ['rudraksha', 'mala', 'beads', 'spiritual']
  },
  {
    name: 'Copper Kalash with Coconut',
    description: 'Traditional copper kalash (pot) with coconut for puja ceremonies. Includes decorative cloth and mango leaves.',
    price: 799,
    category: 'Puja Items',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    stock: 40,
    featured: false,
    rating: { average: 4.4, count: 12 },
    tags: ['kalash', 'copper', 'puja', 'traditional']
  },
  {
    name: 'Camphor Tablets (Pure)',
    description: 'Pure camphor tablets for aarti and puja rituals. Natural and chemical-free. Pack of 50 tablets.',
    price: 149,
    category: 'Puja Items',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    stock: 80,
    featured: false,
    rating: { average: 4.3, count: 35 },
    tags: ['camphor', 'aarti', 'pure', 'natural']
  },
  {
    name: 'Decorative Rangoli Stencils',
    description: 'Set of 10 beautiful rangoli stencils for creating stunning floor designs during festivals.',
    price: 299,
    category: 'Decorative Items',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    stock: 60,
    featured: false,
    rating: { average: 4.2, count: 18 },
    tags: ['rangoli', 'stencils', 'festival', 'decoration']
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pandit-ji-booking');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Hash passwords for users
    for (let user of sampleUsers) {
      user.password = await bcrypt.hash(user.password, 12);
    }

    // Insert sample users
    const insertedUsers = await User.insertMany(sampleUsers);
    console.log(`👥 Inserted ${insertedUsers.length} users`);

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`🛍️  Inserted ${insertedProducts.length} products`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Sample login credentials:');
    console.log('Regular User: user@panditji.com / user123');
    console.log('Pandit 1: rajesh@panditji.com / pandit123');
    console.log('Pandit 2: vikram@panditji.com / pandit123');
    console.log('Admin: admin@panditji.com / admin123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed script
seedDatabase();