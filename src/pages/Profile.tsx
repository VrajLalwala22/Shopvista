import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  MapPinIcon,
  UserIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'delivered' | 'processing';
  items: number;
}

const mockOrders: Order[] = [
  {
    id: 'ORD001',
    date: '2024-03-15',
    total: 2499,
    status: 'delivered',
    items: 3
  },
  {
    id: 'ORD002',
    date: '2024-03-10',
    total: 1899,
    status: 'processing',
    items: 2
  },
  {
    id: 'ORD003',
    date: '2024-03-05',
    total: 3299,
    status: 'pending',
    items: 4
  }
];

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    email: '',
    phone: '',
    location: '',
  });

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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h1>
          <Link
            to="/login"
            className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <section className="relative py-16 sm:py-24">
       
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent/80 mix-blend-multiply"></div>
        
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-primary rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6">
              <div className="w-24 h-24 rounded-full bg-white p-1 mx-auto">
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                  <UserIcon className="w-12 h-12 text-gray-600" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{user.firstName} {user.lastName}</h1>
            <p className="text-lg text-gray-100">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </section>

      
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <div className="text-primary">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-gray-900">{user.email}</span>
                    </div>
                    <div className="flex items-center">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-gray-900">{user.phone}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Shipping Address</h3>
                  <div className="space-y-2">
                    <p className="text-gray-900">{user.location}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleEditToggle}
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
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
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left bg-gray-50">
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/orders/${order.id}`}
                          className="text-primary hover:text-primary-dark"
                        >
                          #{order.id}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {order.items} items
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        ₹{order.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            order.status === 'delivered'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'processing'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
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