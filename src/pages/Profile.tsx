import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ShoppingBagIcon,
  HeartIcon,
  StarIcon,
  PencilIcon,
  XMarkIcon,
  CheckIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    email: '',
    phone: '',
    location: '',
  });

  const recentOrders = [
    { id: 1, date: '2024-03-15', status: 'Delivered', total: 299 },
    { id: 2, date: '2024-03-10', status: 'In Transit', total: 149 },
    { id: 3, date: '2024-03-05', status: 'Delivered', total: 199 },
  ];

  const stats = [
    { label: 'Orders', value: 12, icon: <ShoppingBagIcon className="w-6 h-6" /> },
    { label: 'Wishlist', value: 5, icon: <HeartIcon className="w-6 h-6" /> },
    { label: 'Reviews', value: 8, icon: <StarIcon className="w-6 h-6" /> },
  ];

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setProfileData({
      email: user.email || '',
      phone: user.phone || '',
      location: user.location || '',
    });
  }, [user, navigate]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
    if (editMode) {
      setProfileData({
        email: user?.email || '',
        phone: user?.phone || '',
        location: user?.location || '',
      });
    }
  };

  const handleSave = () => {
    if (user) {
      updateUser({
        ...user,
        ...profileData
      });
      setEditMode(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section with animated background */}
      <section className="relative w-full py-20 overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent/80 mix-blend-multiply"></div>
        
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-primary rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-white shadow-xl mb-6 flex items-center justify-center text-primary text-4xl font-bold">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">{user.firstName} {user.lastName}</h1>
            <p className="text-gray-100 text-lg">@{user.username}</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <div className="text-primary">
                      {stat.icon}
                    </div>
                  </div>
                  <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                </div>
                <h3 className="text-gray-600 font-medium">{stat.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profile Information Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
              <button
                onClick={handleEditToggle}
                className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                {editMode ? (
                  <>
                    <XMarkIcon className="w-5 h-5 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <PencilIcon className="w-5 h-5 mr-2" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!editMode}
                      className="pl-10 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!editMode}
                      className="pl-10 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPinIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      disabled={!editMode}
                      className="pl-10 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {editMode && (
                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    <CheckIcon className="w-5 h-5 mr-2" />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Orders Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Order ID</th>
                    <th className="text-left py-3 px-4 text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 text-gray-600">Status</th>
                    <th className="text-right py-3 px-4 text-gray-600">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">#{order.id}</td>
                      <td className="py-4 px-4">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                            order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">₹{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile; 