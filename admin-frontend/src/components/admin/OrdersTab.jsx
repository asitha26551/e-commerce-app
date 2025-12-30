import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { OrderDetailsModal } from './OrderDetailsModal';

export function OrdersTab() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('admin_token')
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/order`, {
          headers: { token }
        })
        const data = await res.json()
        setOrders(data.orders || [])
      } catch (err) {
        setError('Failed to fetch orders')
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  if (loading) return <div className="p-8 text-text-secondary">Loading orders...</div>
  if (error) return <div className="p-8 text-error">{error}</div>

  // Modal close handler
  const closeModal = () => {
    setSelectedOrder(null);
    setStatus('');
  };

  // Save status handler
  const handleStatusUpdate = async () => {
    if (!selectedOrder) return;
    setSaving(true);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/order/${selectedOrder._id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setOrders(orders => orders.map(o => o._id === selectedOrder._id ? { ...o, status } : o));
        setSelectedOrder({ ...selectedOrder, status });
      }
    } catch {}
    setSaving(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-x-auto">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-surface">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Order ID</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Date</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">User</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Phone</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Address</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Payment</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Payment Status</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Total</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-surface divide-y divide-border">
          {orders.length === 0 ? (
            <tr>
              <td colSpan={10} className="text-center py-8 text-text-secondary">No orders found.</td>
            </tr>
          ) : (
            orders.map(order => (
              <tr key={order._id} className="hover:bg-background/60 transition-colors">
                <td className="px-4 py-3 text-primary text-sm font-mono">{order._id.slice(-6)}</td>
                <td className="px-4 py-3 text-sm text-text-secondary">{new Date(order.createdAt).toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-text">{order.userId?.name || order.userId || '-'}</td>
                <td className="px-4 py-3 text-sm text-text-secondary">{order.shippingAddress?.phone || '-'}</td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {order.shippingAddress ? (
                    <span className="text-xs text-text-secondary" style={{whiteSpace: 'pre-line'}}>
                      {order.shippingAddress.fullName && (<>{order.shippingAddress.fullName}<br/></>)}
                      {order.shippingAddress.phone && (<>{order.shippingAddress.phone}<br/></>)}
                      {order.shippingAddress.line1 && (<>{order.shippingAddress.line1}<br/></>)}
                      {order.shippingAddress.line2 && (<>{order.shippingAddress.line2}<br/></>)}
                      {(order.shippingAddress.city || order.shippingAddress.postalCode) && (
                        <>
                          {order.shippingAddress.city}{order.shippingAddress.city && order.shippingAddress.postalCode ? ', ' : ''}{order.shippingAddress.postalCode}<br/>
                        </>
                      )}
                      {order.shippingAddress.country && (<>{order.shippingAddress.country}</>)}
                    </span>
                  ) : <span className="text-text-secondary">-</span>}
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">{order.paymentMethod}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-semibold capitalize border ${
                    order.paymentStatus === 'paid' ? 'bg-success/20 text-success border-success/50' :
                    order.paymentStatus === 'failed' ? 'bg-error/20 text-error border-error/50' :
                    order.paymentStatus === 'refunded' ? 'bg-accent/20 text-accent border-accent/50' :
                    'bg-yellow-500/20 text-yellow-500 border-yellow-500/50'
                  }`}>
                    {order.paymentStatus || 'pending'}
                  </span>
                </td>
                <td className="px-4 py-3 font-bold text-sm text-text">${order.total?.toFixed(2) ?? '0.00'}</td>
                <td className="px-4 py-3 text-sm whitespace-nowrap">
                  <span className={`px-3 py-1 rounded text-xs font-semibold capitalize border ${
                    order.status === 'delivered' ? 'bg-success/20 text-success border-success/50' :
                    order.status === 'shipped' ? 'bg-accent/20 text-accent border-accent/50' :
                    order.status === 'cancelled' ? 'bg-error/20 text-error border-error/50' :
                    'bg-yellow-500/20 text-yellow-500 border-yellow-500/50'
                  }`}>{order.status}</span>
                </td>
                <td className="px-4 py-3 text-sm align-middle">
                  <div className="flex items-center gap-2 h-full">
                    <button title="Update Status" onClick={() => { setSelectedOrder(order); setStatus(order.status); }} className="p-1 rounded hover:bg-background/80 flex items-center justify-center">
                      <Edit className="h-4 w-4 text-cta" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    {/* Order Details Modal */}
    {selectedOrder && (
      <OrderDetailsModal
        isOpen={!!selectedOrder}
        onClose={closeModal}
        order={selectedOrder}
        onUpdateStatus={async (newStatus) => {
          setSaving(true);
          try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/order/${selectedOrder._id}/status`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                token
              },
              body: JSON.stringify({ status: newStatus })
            });
            const data = await res.json();
            if (data.success) {
              setOrders(orders => orders.map(o => o._id === selectedOrder._id ? { ...o, status: newStatus } : o));
              setSelectedOrder({ ...selectedOrder, status: newStatus });
              setStatus(newStatus);
            }
          } catch {}
          setSaving(false);
          closeModal();
        }}
      />
    )}
    </motion.div>
  )
}
