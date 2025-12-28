import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import api from '../services/api';

export function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get(`/order/${id}`, { headers: { token } });
        setOrder(res.data.order);
      } catch (err) {
        setError('Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center text-lg text-gray-500">Loading order details...</main>
        <Footer />
      </div>
    );
  }
  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center text-lg text-red-600">{error || 'Order not found.'}</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/orders" className="text-blue-600 hover:underline mb-6 inline-block">← Back to Order History</Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Order Details</h1>
        {/* Order Summary */}
        <section className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Order #{order._id.slice(-6)}</h2>
              <p className="text-sm text-gray-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold capitalize
              ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                'bg-yellow-100 text-yellow-700'}`}>{order.status}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div><span className="font-medium">Payment Method:</span> {order.paymentMethod}</div>
            <div><span className="font-medium">Order Total:</span> ${order.total?.toFixed(2) ?? '0.00'}</div>
            <div><span className="font-medium">Subtotal:</span> ${order.subtotal?.toFixed(2) ?? '0.00'}</div>
            <div><span className="font-medium">Shipping Fee:</span> ${order.shippingFee?.toFixed(2) ?? '0.00'}</div>
          </div>
        </section>
        {/* Shipping Address */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Shipping Address</h3>
          <div className="bg-white rounded-lg border p-4 text-gray-700">
            <div><span className="font-medium">{order.shippingAddress.fullName}</span></div>
            <div>{order.shippingAddress.phone}</div>
            <div>{order.shippingAddress.line1}{order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ''}</div>
            <div>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</div>
            <div>{order.shippingAddress.country}</div>
          </div>
        </section>
        {/* Ordered Items */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Ordered Items</h3>
          <div className="bg-white rounded-lg border p-4 divide-y">
            {order.items && order.items.length > 0 ? order.items.map((item, idx) => (
              <div key={item._id || idx} className="flex flex-col sm:flex-row sm:items-center py-4 gap-4">
                <img src={item.product?.images?.[0] || '/placeholder.png'} alt={item.product?.name} className="w-16 h-16 rounded border object-cover" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{item.product?.name}</div>
                  {item.variant && <div className="text-xs text-gray-500">Variant: {item.variant.name}</div>}
                  <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">${item.priceEach?.toFixed(2) ?? '0.00'} each</div>
                  <div className="text-xs text-gray-500">Line Total: ${(item.priceEach * item.quantity).toFixed(2)}</div>
                </div>
              </div>
            )) : <div className="text-gray-500">No items found.</div>}
          </div>
        </section>
        {/* Payment Info */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Information</h3>
          <div className="bg-white rounded-lg border p-4 text-gray-700">
            <div><span className="font-medium">Payment Method:</span> {order.paymentMethod}</div>
            <div><span className="font-medium">Status:</span> {order.status}</div>
            <div><span className="font-medium">Total Paid:</span> ${order.total?.toFixed(2) ?? '0.00'}</div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
