import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import api from '../services/api';

export function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/order/user', {
          headers: { token },
        });
        setOrders(res.data.orders || []);
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10">
          Order History
        </h1>

        {loading ? (
          <div className="flex justify-center py-20 text-gray-500 text-lg">
            Loading your orders...
          </div>
        ) : error ? (
          <div className="text-center text-red-600 font-medium py-20">
            {error}
          </div>
        ) : (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="text-center text-gray-500 py-20">
                You haven’t placed any orders yet.
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      Order #{order._id.slice(-6)}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-600">
                      <span>Status: <span className={`font-semibold capitalize ${
                        order.status === 'delivered' ? 'text-green-700' :
                        order.status === 'shipped' ? 'text-blue-700' :
                        order.status === 'cancelled' ? 'text-red-700' :
                        'text-yellow-700'
                      }`}>{order.status}</span></span>
                      <span>Payment: <span className="font-semibold">{order.paymentMethod}</span></span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-2xl font-bold text-gray-900">${order.total?.toFixed(2) ?? '0.00'}</span>
                    <Link
                      to={`/orders/${order._id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
