import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { useCart } from '../context/CartContext'
import api from '../services/api'

export function CheckoutPage() {
  const { cartTotal, items, clearCart } = useCart()
  const navigate = useNavigate();
  const shipping = cartTotal > 50 ? 0 : 10
  const total = cartTotal + shipping

  // Address fields as per Address.model.js
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [orderMsg, setOrderMsg] = useState('');

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setOrderMsg('');
    try {
      if (paymentMethod === 'cod') {
        // Prepare items for backend
        const orderItems = items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          priceEach: item.price,
        }));
        const token = localStorage.getItem('token');
        const res = await api.post('/order', {
          items: orderItems,
          subtotal: cartTotal,
          shippingFee: shipping,
          total,
          address: address,
        }, {
          headers: { token }
        });
        setOrderMsg(res.data.message || 'Order placed!');
        clearCart();
        setTimeout(() => {
          navigate('/orders');
        }, 1200);
      } else {
        setOrderMsg('Selected payment method not implemented in demo.');
      }
    } catch (err) {
      setOrderMsg(err?.response?.data?.message || 'Order failed.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Forms */}
          <div className="lg:col-span-8 space-y-8">
            {/* Shipping Address */}
            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Full Name" name="fullName" value={address.fullName} onChange={handleAddressChange} placeholder="John Doe" />
                <Input label="Phone" name="phone" value={address.phone} onChange={handleAddressChange} placeholder="1234567890" />
                <Input label="Address Line 1" name="line1" value={address.line1} onChange={handleAddressChange} className="md:col-span-2" placeholder="123 Main St" />
                <Input label="Address Line 2" name="line2" value={address.line2} onChange={handleAddressChange} className="md:col-span-2" placeholder="Apt, Suite, etc." />
                <Input label="City" name="city" value={address.city} onChange={handleAddressChange} />
                <Input label="Postal Code" name="postalCode" value={address.postalCode} onChange={handleAddressChange} />
                <Input label="Country" name="country" value={address.country} onChange={handleAddressChange} />
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
              <div className="space-y-4">
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={handlePaymentChange} className="h-4 w-4 text-primary focus:ring-primary" />
                  <span className="ml-3 block text-sm font-medium text-gray-900">Cash on Delivery</span>
                </label>
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input type="radio" name="paymentMethod" value="stripe" checked={paymentMethod === 'stripe'} onChange={handlePaymentChange} className="h-4 w-4 text-primary focus:ring-primary" />
                  <span className="ml-3 block text-sm font-medium text-gray-900">Stripe</span>
                </label>
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input type="radio" name="paymentMethod" value="razorpay" checked={paymentMethod === 'razorpay'} onChange={handlePaymentChange} className="h-4 w-4 text-primary focus:ring-primary" />
                  <span className="ml-3 block text-sm font-medium text-gray-900">RazorPay</span>
                </label>
              </div>
            </section>

            {/* Payment */}
            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Details</h2>
              <div className="space-y-4">
                <Input label="Card Number" placeholder="0000 0000 0000 0000" />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Expiration Date" placeholder="MM/YY" />
                  <Input label="CVC" placeholder="123" />
                </div>
                <Input label="Cardholder Name" placeholder="John Doe" />
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <ul className="-my-4 divide-y divide-gray-200 mb-6">
                {items.map((item) => (
                  <li key={item.id} className="flex py-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover object-center" />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3 className="line-clamp-1">{item.name}</h3>
                        <p className="ml-4">${item.price.toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-200 pt-4 space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                {/* Tax removed */}
                <div className="flex justify-between text-base font-bold text-gray-900 pt-4 border-t border-gray-200">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button variant="cta" fullWidth size="lg" className="mt-6" onClick={handlePlaceOrder} disabled={loading}>
                {loading ? 'Placing Order...' : 'Place Order'}
              </Button>
              {orderMsg && <p className="mt-4 text-center text-sm text-green-600">{orderMsg}</p>}
              <p className="mt-4 text-center text-xs text-gray-500">
                By placing this order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
