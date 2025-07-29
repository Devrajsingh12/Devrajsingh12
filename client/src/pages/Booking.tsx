import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface Pandit {
  _id: string;
  name: string;
  email: string;
  profile: {
    bio: string;
    contact: string;
    location: string;
    services: string[];
    experience: number;
    rating: number;
  };
}

const Booking: React.FC = () => {
  const [pandits, setPandits] = useState<Pandit[]>([]);
  const [selectedPandit, setSelectedPandit] = useState<Pandit | null>(null);
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    location: '',
    notes: '',
    price: 1500
  });
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const { user } = useAuth();

  const services = [
    'Griha Pravesh',
    'Vivah (Marriage)',
    'Havan/Yagna',
    'Puja',
    'Naamkaran',
    'Janmashtami',
    'Diwali Puja',
    'Satyanarayan Katha',
    'Rudrabhishek',
    'Other'
  ];

  useEffect(() => {
    fetchPandits();
  }, []);

  const fetchPandits = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/pandits');
      setPandits(response.data);
    } catch (error) {
      console.error('Error fetching pandits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to book a Pandit');
      return;
    }
    if (!selectedPandit) {
      alert('Please select a Pandit');
      return;
    }

    setBookingLoading(true);
    try {
      await axios.post('http://localhost:5000/api/bookings', {
        ...formData,
        pandit: selectedPandit._id
      });
      alert('Booking successful! Check your dashboard for updates.');
      setFormData({
        service: '',
        date: '',
        time: '',
        location: '',
        notes: '',
        price: 1500
      });
      setSelectedPandit(null);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading Pandits...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">📅 Book a Pandit</h1>
          <p className="text-xl">Find and book experienced Pandits for your religious ceremonies</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Available Pandits */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Available Pandits</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {pandits.map(pandit => (
                <div 
                  key={pandit._id} 
                  className={`card cursor-pointer transition ${
                    selectedPandit?._id === pandit._id ? 'ring-2 ring-orange-500' : ''
                  }`}
                  onClick={() => setSelectedPandit(pandit)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">🙏 {pandit.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{pandit.profile.bio || 'Experienced Pandit'}</p>
                      <div className="text-sm text-gray-500 space-y-1">
                        <div>📍 {pandit.profile.location || 'Location not specified'}</div>
                        <div>⭐ Rating: {pandit.profile.rating}/5</div>
                        <div>🎓 Experience: {pandit.profile.experience} years</div>
                        <div>📞 {pandit.profile.contact || pandit.email}</div>
                      </div>
                      {pandit.profile.services && pandit.profile.services.length > 0 && (
                        <div className="mt-2">
                          <strong className="text-sm">Services:</strong>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {pandit.profile.services.map((service, index) => (
                              <span key={index} className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-orange-600">₹1500+</div>
                      <div className="text-xs text-gray-500">Starting price</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Book Your Service</h2>
            
            {selectedPandit && (
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6">
                <div className="text-green-800">
                  <strong>Selected Pandit:</strong> {selectedPandit.name}
                </div>
              </div>
            )}

            <form onSubmit={handleBooking} className="card space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Type *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                >
                  <option value="">Select a service</option>
                  {services.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter ceremony location"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="500"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Any special requirements or notes..."
                  className="input-field"
                />
              </div>

              <button
                type="submit"
                disabled={!selectedPandit || !user || bookingLoading}
                className="w-full btn-primary disabled:opacity-50"
              >
                {bookingLoading ? 'Booking...' : 'Book Pandit'}
              </button>

              {!user && (
                <p className="text-center text-sm text-red-600">
                  Please <a href="/login" className="underline">login</a> to book a Pandit
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;