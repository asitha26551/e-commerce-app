import React, { useState } from 'react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Select } from '../ui/Select'
import {
    Package,
    MapPin,
    CreditCard,
    User,
    Calendar,
} from 'lucide-react'

export function OrderDetailsModal({
    isOpen,
    onClose,
    order,
    onUpdateStatus,
}) {
    const [status, setStatus] = useState(order.status)

    const subtotal = order.total || 0
    const shipping = order.shippingFee || 0
    const total = subtotal + shipping

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Order ${order._id?.slice(-6) || ''}`}
            maxWidth="6xl"
        >
            <div className="space-y-4">

                {/* ================= HEADER ================= */}
                <section className="bg-surface border border-border rounded-xl p-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                    <div className="flex items-center gap-2 text-text-secondary text-sm">
                        <Calendar className="h-4 w-4" />
                        {new Date(order.createdAt).toLocaleString()}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-text-secondary">Status</span>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize border
                ${order.status === 'delivered'
                                        ? 'bg-success/20 text-success border-success/50'
                                        : order.status === 'shipped'
                                            ? 'bg-accent/20 text-accent border-accent/50'
                                            : order.status === 'cancelled'
                                                ? 'bg-error/20 text-error border-error/50'
                                                : 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50'
                                    }`}
                            >
                                {order.status}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-text-secondary">Payment</span>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize border
                ${order.paymentStatus === 'paid'
                                        ? 'bg-success/20 text-success border-success/50'
                                        : order.paymentStatus === 'failed'
                                            ? 'bg-error/20 text-error border-error/50'
                                            : order.paymentStatus === 'refunded'
                                                ? 'bg-accent/20 text-accent border-accent/50'
                                                : 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50'
                                    }`}
                            >
                                {order.paymentStatus || 'pending'}
                            </span>
                        </div>
                    </div>
                </section>

                {/* ================= MAIN ================= */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                    {/* Left: Customer + Shipping */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Customer */}
                        <div className="space-y-2">
                            <h3 className="flex items-center gap-2 text-base font-display text-text">
                                <User className="h-5 w-5 text-primary" />
                                Customer Details
                            </h3>

                            <div className="bg-surface border border-border rounded-xl p-3 space-y-1 text-sm">
                                <p className="font-medium text-text">
                                    {typeof order.userId === 'object' ? order.userId?._id : order.userId || '-'}
                                </p>
                            </div>
                        </div>

                        {/* Shipping */}
                        <div className="space-y-2">
                            <h3 className="flex items-center gap-2 text-base font-display text-text">
                                <MapPin className="h-5 w-5 text-accent" />
                                Shipping Address
                            </h3>

                            <div className="bg-surface border border-border rounded-xl p-3 text-sm space-y-1 text-text-secondary">
                                {order.shippingAddress ? (
                                    <>
                                        {order.shippingAddress.fullName && (
                                            <div>{order.shippingAddress.fullName}</div>
                                        )}
                                        {order.shippingAddress.phone && (
                                            <div>{order.shippingAddress.phone}</div>
                                        )}
                                        {order.shippingAddress.line1 && (
                                            <div>{order.shippingAddress.line1}</div>
                                        )}
                                        {order.shippingAddress.line2 && (
                                            <div>{order.shippingAddress.line2}</div>
                                        )}
                                        {order.shippingAddress.city && (
                                            <div>{order.shippingAddress.city}</div>
                                        )}
                                        {order.shippingAddress.postalCode && (
                                            <div>{order.shippingAddress.postalCode}</div>
                                        )}
                                        {order.shippingAddress.country && (
                                            <div>{order.shippingAddress.country}</div>
                                        )}
                                    </>
                                ) : (
                                    <div>No address provided</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: Payment + Totals + Actions */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h3 className="flex items-center gap-2 text-base font-display text-text">
                                <CreditCard className="h-5 w-5 text-success" />
                                Payment & Totals
                            </h3>

                            <div className="bg-surface border border-border rounded-xl p-3 space-y-2">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-sm font-medium text-text">
                                        {order.paymentMethod || '-'}
                                    </span>
                                    <span className="text-xs text-text-secondary">Method</span>
                                </div>

                                <div className="h-px bg-border" />

                                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-sm">
                                    <div className="text-text-secondary">Subtotal</div>
                                    <div className="text-right text-text">${subtotal.toFixed(2)}</div>
                                    <div className="text-text-secondary">Shipping</div>
                                    <div className="text-right text-text">${shipping.toFixed(2)}</div>
                                    <div className="font-semibold text-primary">Grand Total</div>
                                    <div className="text-right font-semibold text-primary">
                                        ${total.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface border border-border rounded-xl p-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3 items-end">
                                <Select
                                    label="Update Status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    fullWidth
                                    options={[
                                        { value: 'pending', label: 'Pending' },
                                        { value: 'processing', label: 'Processing' },
                                        { value: 'shipped', label: 'Shipped' },
                                        { value: 'delivered', label: 'Delivered' },
                                        { value: 'cancelled', label: 'Cancelled' },
                                    ]}
                                />

                                <div className="flex gap-3 justify-end">
                                    <Button variant="secondary" onClick={onClose}>
                                        Close
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={() => onUpdateStatus?.(status)}
                                    >
                                        Update
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= ITEMS ================= */}
                <section className="space-y-2">
                    <h3 className="flex items-center gap-2 text-base font-display text-text">
                        <Package className="h-5 w-5 text-cta" />
                        Order Items
                    </h3>

                    <div className="bg-surface border border-border rounded-xl overflow-hidden">
                        <table className="w-full text-xs">
                            <thead className="bg-background border-b border-border">
                                <tr>
                                    <th className="px-3 py-2 text-left">Product</th>
                                    <th className="px-3 py-2 text-center">Qty</th>
                                    <th className="px-3 py-2 text-right">Price</th>
                                    <th className="px-3 py-2 text-right">Total</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-border">
                                {Array.isArray(order.items) && order.items.length > 0 ? (
                                    order.items.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-white/5">
                                            <td className="px-3 py-2">
                                                <div className="truncate max-w-[28rem]">
                                                    {item.productId?.name || item.productName || item.name || item.productId}
                                                </div>
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                                {item.quantity}
                                            </td>
                                            <td className="px-3 py-2 text-right">
                                                ${(item.priceEach || item.price).toFixed(2)}
                                            </td>
                                            <td className="px-3 py-2 text-right font-medium">
                                                ${((item.priceEach || item.price) * item.quantity).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="py-4 text-center text-text-secondary"
                                        >
                                            No items
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </Modal>
    )
}
