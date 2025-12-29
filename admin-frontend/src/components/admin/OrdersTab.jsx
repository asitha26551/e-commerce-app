import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

  if (loading) return <div className="p-8 text-gray-500">Loading orders...</div>
  if (error) return <div className="p-8 text-red-600">{error}</div>

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
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500">Order ID</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500">Date</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500">User</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500">Phone</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500">Address</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500">Payment</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500">Payment Status</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500">Total</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500">Status</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center py-8 text-gray-500">No orders found.</td>
            </tr>
          ) : (
            orders.map(order => (
              <tr key={order._id}>
                <td className="px-4 py-3 text-blue-600 text-sm">{order._id.slice(-6)}</td>
                <td className="px-4 py-3 text-sm">{new Date(order.createdAt).toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">{order.userId?.name || order.userId || '-'}</td>
                <td className="px-4 py-3 text-sm">{order.shippingAddress?.phone || '-'}</td>
                <td className="px-4 py-3 text-sm">
                  {order.shippingAddress ? (
                    <span>
                      {order.shippingAddress.fullName}<br/>
                      {order.shippingAddress.line1}{order.shippingAddress.line2 ? ', ' + order.shippingAddress.line2 : ''}<br/>
                      {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br/>
                      {order.shippingAddress.country}
                    </span>
                  ) : '-'}
                </td>
                <td className="px-4 py-3 text-sm">{order.paymentMethod}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${
                    order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' :
                    order.paymentStatus === 'failed' ? 'bg-red-100 text-red-700' :
                    order.paymentStatus === 'refunded' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.paymentStatus || 'pending'}
                  </span>
                </td>
                <td className="px-4 py-3 font-bold text-sm">${order.total?.toFixed(2) ?? '0.00'}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>{order.status}</span>
                </td>
                <td className="px-4 py-3 flex gap-2 items-center text-sm">
                  <button title="View Details" onClick={() => { setSelectedOrder(order); setStatus(order.status); }} className="p-1 rounded hover:bg-gray-100">
                    <Eye className="h-4 w-4 text-blue-600" />
                  </button>
                  <button title="Update Status" onClick={() => { setSelectedOrder(order); setStatus(order.status); }} className="p-1 rounded hover:bg-gray-100">
                    <Edit className="h-4 w-4 text-yellow-600" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    {/* Order Details Modal */}
    {selectedOrder && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white max-w-3xl w-full rounded shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
          <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl">&times;</button>
          {/* 1️⃣ Order Overview */}
          <h2 className="text-lg font-bold mb-2">Order Overview</h2>
          <div className="mb-2 grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <div><span className="font-semibold">Order ID:</span> {selectedOrder._id}</div>
              <div><span className="font-semibold">Order Date:</span> {new Date(selectedOrder.createdAt).toLocaleString()}</div>
              <div><span className="font-semibold">Last Updated:</span> {new Date(selectedOrder.updatedAt).toLocaleString()}</div>
            </div>
            <div>
              <div><span className="font-semibold">User ID:</span> {selectedOrder.userId?._id || selectedOrder.userId || '-'}</div>
              <div><span className="font-semibold">Name:</span> {selectedOrder.userId?.name || '-'}</div>
              <div><span className="font-semibold">Email:</span> {selectedOrder.userId?.email || '-'}</div>
            </div>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Order Status:</span>
            <select
              className="ml-2 border rounded px-2 py-1"
              value={status}
              onChange={e => setStatus(e.target.value)}
              disabled={saving}
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button
              className="ml-2 px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
              onClick={handleStatusUpdate}
              disabled={saving || status === selectedOrder.status}
            >
              Save
            </button>
          </div>
          {/* 2️⃣ Payment Information */}
          <h3 className="text-base font-semibold mt-4 mb-1">Payment Information</h3>
          <div className="mb-2">
            <div><span className="font-semibold">Payment Method:</span> {selectedOrder.paymentMethod}</div>
            <div><span className="font-semibold">Payment Status:</span> {selectedOrder.paymentStatus || 'pending'}</div>
          </div>
          {/* 3️⃣ Shipping Address */}
          <h3 className="text-base font-semibold mt-4 mb-1">Shipping Address</h3>
          <div className="mb-2">
            {selectedOrder.shippingAddress ? (
              <div>
                <div>{selectedOrder.shippingAddress.fullName}</div>
                <div>{selectedOrder.shippingAddress.phone}</div>
                <div>{selectedOrder.shippingAddress.line1}{selectedOrder.shippingAddress.line2 ? ', ' + selectedOrder.shippingAddress.line2 : ''}</div>
                <div>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}</div>
                <div>{selectedOrder.shippingAddress.country}</div>
              </div>
            ) : <div>-</div>}
          </div>
          {/* 4️⃣ Ordered Items */}
          <h3 className="text-base font-semibold mt-4 mb-1">Ordered Items</h3>
          <div className="overflow-x-auto mb-2">
            <table className="min-w-full text-xs border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 py-2 border">Product</th>
                  <th className="px-2 py-2 border">Variant</th>
                  <th className="px-2 py-2 border">Qty</th>
                  <th className="px-2 py-2 border">Price Each</th>
                  <th className="px-2 py-2 border">Line Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items && selectedOrder.items.length > 0 ? selectedOrder.items.map((item, idx) => (
                  <tr key={item._id || idx}>
                    <td className="px-2 py-2 border flex items-center gap-2">
                      {item.productImage && <img src={item.productImage} alt="" className="w-8 h-8 object-cover rounded" />}
                      <div>
                        <div className="font-semibold">{item.productName}</div>
                        <div className="text-[10px] text-gray-500">ID: {item.productId}</div>
                      </div>
                    </td>
                    <td className="px-2 py-2 border">
                      {item.variant ? (
                        <span>{Object.entries(item.variant).map(([k, v]) => `${k}: ${v}`).join(', ')}</span>
                      ) : '-'}
                    </td>
                    <td className="px-2 py-2 border">{item.quantity}</td>
                    <td className="px-2 py-2 border">${item.priceEach?.toFixed(2) ?? '-'}</td>
                    <td className="px-2 py-2 border">${(item.priceEach * item.quantity).toFixed(2)}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={5} className="text-center py-2">No items</td></tr>
                )}
              </tbody>
            </table>
          </div>
          {/* 5️⃣ Pricing Breakdown */}
          <h3 className="text-base font-semibold mt-4 mb-1">Pricing Breakdown</h3>
          <div className="mb-2">
            <div><span className="font-semibold">Subtotal:</span> ${selectedOrder.subtotal?.toFixed(2) ?? '-'}</div>
            <div><span className="font-semibold">Shipping Fee:</span> ${selectedOrder.shippingFee?.toFixed(2) ?? '-'}</div>
            <div><span className="font-semibold">Grand Total:</span> ${selectedOrder.total?.toFixed(2) ?? '-'}</div>
          </div>
          {/* 6️⃣ Admin Actions */}
          <div className="mt-4 flex gap-2 flex-wrap">
            <button className="px-3 py-1 bg-red-600 text-white rounded" disabled>Cancel Order</button>
            <button className="px-3 py-1 bg-green-600 text-white rounded" disabled>Mark as Delivered</button>
            <button className="px-3 py-1 bg-gray-400 text-white rounded" disabled>Initiate Refund</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded" disabled>View Payment Transaction</button>
          </div>
        </div>
      </div>
    )}
    </motion.div>
  )
}
