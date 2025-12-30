import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Select } from '../components/ui/Select';
import { History } from 'lucide-react';
import api from '../services/api';

export function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

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

  const filteredOrders =
    filter === 'all'
      ? orders
      : orders.filter((order) => order.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-success/20 text-success border-success/50';
      case 'shipped':
        return 'bg-accent/20 text-accent border-accent/50';
      case 'processing':
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
      case 'cancelled':
        return 'bg-error/20 text-error border-error/50';
      default:
        return 'bg-border/20 text-text-secondary border-border/50';
    }
  };

  const getPaymentStatusColor = (paymentStatus) => {
    switch (paymentStatus) {
      case 'paid':
        return 'bg-success/20 text-success border-success/50';
      case 'failed':
        return 'bg-error/20 text-error border-error/50';
      case 'refunded':
        return 'bg-accent/20 text-accent border-accent/50';
      case 'pending':
      default:
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center">
            <History className="h-8 w-8 text-primary mr-3" />
            <div>
              <h1 className="text-3xl font-display font-bold text-white">
                ORDER <span className="text-primary">HISTORY</span>
              </h1>
              <p className="text-text-secondary mt-1">
                Track your orders and manage your purchases.
              </p>
            </div>
          </div>

          <div className="w-full md:w-48">
            <Select
              options={[
                { value: 'all', label: 'All Orders' },
                { value: 'pending', label: 'Pending' },
                { value: 'processing', label: 'Processing' },
                { value: 'shipped', label: 'Shipped' },
                { value: 'delivered', label: 'Delivered' },
                { value: 'cancelled', label: 'Cancelled' },
              ]}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="mb-0"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20 text-text-secondary text-lg">
            Loading your orders...
          </div>
        ) : error ? (
          <div className="text-center text-error font-medium py-20">
            {error}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.length === 0 ? (
              <div className="text-center text-text-secondary py-20 bg-surface rounded-lg border border-border">
                You haven’t placed any orders yet.
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-surface rounded-lg border border-border shadow-sm hover:border-primary/60 transition-colors duration-200 p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white truncate">
                      Order {order._id.slice(-6)}
                    </h3>
                    <p className="text-sm text-text-secondary mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    {order.items && order.items.length > 0 && (
                      <div className="mt-3 text-xs text-text-secondary space-y-1">
                        <p className="uppercase tracking-wide text-[11px] text-text-secondary/80">
                          Items
                        </p>
                        <div className="space-y-0.5">
                          {order.items.slice(0, 2).map((item) => (
                            <p key={item._id} className="truncate">
                              <span className="text-white">
                                {item.product?.name || 'Item'}
                              </span>{' '}
                              <span className="text-text-secondary">
                                ×{item.quantity}
                                {item.variant?.name
                                  ? ` · ${item.variant.name}`
                                  : ''}
                              </span>
                            </p>
                          ))}
                          {order.items.length > 2 && (
                            <p className="text-[11px] text-text-secondary/80">
                              +{order.items.length - 2} more item
                              {order.items.length - 2 > 1 ? 's' : ''}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-text-secondary">
                      <span>
                        Status:{' '}
                        <span
                          className={`inline-flex px-3 py-1 rounded-full border text-[11px] font-semibold uppercase tracking-wide ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </span>
                      <span>
                        Payment:{' '}
                        <span className="font-semibold text-white">
                          {order.paymentMethod}
                        </span>
                      </span>
                      <span>
                        Payment Status:{' '}
                        <span
                          className={`inline-flex px-3 py-1 rounded-full border text-[11px] font-semibold uppercase tracking-wide ${getPaymentStatusColor(
                            order.paymentStatus
                          )}`}
                        >
                          {order.paymentStatus || 'pending'}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-2xl font-bold text-white">
                      ${order.total?.toFixed(2) ?? '0.00'}
                    </span>
                    <Link
                      to={`/orders/${order._id}`}
                      className="text-accent hover:text-white font-medium text-sm flex items-center"
                    >
                      View Details
                      <span className="ml-1">→</span>
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
