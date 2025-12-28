import React, { useState, useEffect } from 'react'
import { User, Package, MapPin, Lock, LogOut } from 'lucide-react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import api from '../services/api'

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [ordersError, setOrdersError] = useState('')

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'security', label: 'Security', icon: Lock },
  ]

  useEffect(() => {
    if (activeTab === 'orders') {
      setOrdersLoading(true);
      setOrdersError('');
      const fetchOrders = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await api.get('/order/user', { headers: { token } });
          setOrders(res.data.orders || []);
        } catch (err) {
          setOrdersError('Failed to fetch orders');
        }
        setOrdersLoading(false);
      };
      fetchOrders();
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <nav className="space-y-1 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-primary'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="mr-3 h-5 w-5" />
                  {tab.label}
                </button>
              ))}

              <div className="pt-4 mt-4 border-t border-gray-100">
                <button className="w-full flex items-center px-4 py-3 text-sm font-medium text-error hover:bg-red-50 rounded-md transition-colors">
                  <LogOut className="mr-3 h-5 w-5" />
                  Sign Out
                </button>
              </div>
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 p-8">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Profile Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="First Name" defaultValue="John" />
                  <Input label="Last Name" defaultValue="Doe" />
                  <Input
                    label="Email"
                    defaultValue="john.doe@example.com"
                    className="md:col-span-2"
                  />
                  <Input label="Phone" defaultValue="+1 (555) 000-0000" />
                </div>
                <Button>Save Changes</Button>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Order History
                </h2>
                {ordersLoading ? (
                  <div>Loading...</div>
                ) : ordersError ? (
                  <div className="text-red-600">{ordersError}</div>
                ) : (
                  <div className="space-y-4">
                    {orders.length === 0 ? (
                      <div>No orders found.</div>
                    ) : (
                      orders.map((order) => (
                        <div key={order._id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex justify-between items-center mb-4">
                            <div>
                              <p className="font-bold text-gray-900">
                                Order #{order._id.slice(-6)}
                              </p>
                              <p className="text-sm text-gray-500">
                                Placed on {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-gray-900">${order.total?.toFixed(2) ?? '0.00'}</span>
                            {/* <Button variant="outline" size="sm">View Details</Button> */}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Saved Addresses
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-primary bg-blue-50 rounded-lg p-4 relative">
                    <span className="absolute top-4 right-4 text-xs font-bold text-primary bg-white px-2 py-1 rounded">
                      Default
                    </span>
                    <h3 className="font-bold text-gray-900 mb-2">Home</h3>
                    <p className="text-sm text-gray-600">
                      123 Main St, Apt 4B
                      <br />
                      New York, NY 10001
                      <br />
                      United States
                    </p>
                    <div className="mt-4 flex space-x-2">
                      <button className="text-sm text-primary hover:underline">
                        Edit
                      </button>
                      <button className="text-sm text-error hover:underline">
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="border border-gray-200 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-700 cursor-pointer transition-colors h-40">
                    <span className="text-2xl mb-2">+</span>
                    <span>Add New Address</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Change Password
                </h2>
                <div className="max-w-md space-y-4">
                  <Input label="Current Password" type="password" />
                  <Input label="New Password" type="password" />
                  <Input label="Confirm New Password" type="password" />
                  <Button>Update Password</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
