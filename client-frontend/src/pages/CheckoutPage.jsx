import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { useCart } from '../context/CartContext'
import { ShieldCheck, Wallet, Truck } from 'lucide-react'
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

  const paymentMethods = [
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay when you receive your order',
      icon: '💵',
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Pay securely with credit/debit card',
      icon: '💳',
    },
    // {
    //   id: 'razorpay',
    //   name: 'Razorpay',
    //   description: 'UPI, Cards, NetBanking & More',
    //   icon: '🔐',
    // },
  ]

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
      } else if (paymentMethod === 'stripe') {
        // Prepare items for backend
        const orderItems = items.map(item => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          priceEach: item.price,
        }));
        const token = localStorage.getItem('token');
        const res = await api.post('/order/stripe', {
          items: orderItems,
          subtotal: cartTotal,
          shippingFee: shipping,
          total,
          address: address,
        }, {
          headers: { token }
        });
        if (res.data.url) {
          window.location.href = res.data.url;
        } else {
          setOrderMsg('Stripe payment initiation failed.');
        }
      } else {
        setOrderMsg('Selected payment method not implemented in demo.');
      }
    } catch (err) {
      setOrderMsg(err?.response?.data?.message || 'Order failed.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex items-center mb-8">
          <ShieldCheck className="h-8 w-8 text-success mr-3" />
          <h1 className="text-3xl font-display font-bold text-white">
            SECURE <span className="text-success">CHECKOUT</span>
          </h1>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Forms */}
          <div className="lg:col-span-8 space-y-8">
            {/* Shipping Address */}
            <section className="bg-surface p-8 rounded-lg shadow-lg border border-border">
              <div className="flex items-center mb-6 border-b border-border pb-4">
                <Truck className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-xl font-display font-bold text-white">
                  SHIPPING ADDRESS
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="FULL NAME"
                  name="fullName"
                  value={address.fullName}
                  onChange={handleAddressChange}
                  placeholder="John Doe"
                />
                <Input
                  label="PHONE"
                  name="phone"
                  value={address.phone}
                  onChange={handleAddressChange}
                  placeholder="1234567890"
                />
                <Input
                  label="ADDRESS LINE 1"
                  name="line1"
                  value={address.line1}
                  onChange={handleAddressChange}
                  className="md:col-span-2"
                  placeholder="123 Main St"
                />
                <Input
                  label="ADDRESS LINE 2"
                  name="line2"
                  value={address.line2}
                  onChange={handleAddressChange}
                  className="md:col-span-2"
                  placeholder="Apt, Suite, etc."
                />
                <Input
                  label="CITY"
                  name="city"
                  value={address.city}
                  onChange={handleAddressChange}
                />
                <Input
                  label="POSTAL CODE"
                  name="postalCode"
                  value={address.postalCode}
                  onChange={handleAddressChange}
                />
                <Input
                  label="COUNTRY"
                  name="country"
                  value={address.country}
                  onChange={handleAddressChange}
                />
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-surface p-8 rounded-lg shadow-lg border border-border">
              <div className="flex items-center mb-6 border-b border-border pb-4">
                <Wallet className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-xl font-display font-bold text-white">
                  PAYMENT METHOD
                </h2>
              </div>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`
                      flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all group
                      ${paymentMethod === method.id ? 'border-primary bg-primary/10 shadow-neon-purple' : 'border-border hover:border-primary/50 hover:bg-background/50'}
                    `}
                  >
                    <div className="flex items-center flex-1">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={handlePaymentChange}
                        className="h-4 w-4 text-primary focus:ring-primary bg-background border-gray-600"
                      />
                      <div className="ml-4 flex items-center flex-1">
                        <span className="text-2xl mr-3">{method.icon}</span>
                        <div>
                          <span
                            className={`
                            block text-sm font-bold font-display transition-colors
                            ${paymentMethod === method.id ? 'text-primary' : 'text-white group-hover:text-primary'}
                          `}
                          >
                            {method.name}
                          </span>
                          <span className="block text-sm text-gray-400">
                            {method.description}
                          </span>
                        </div>
                      </div>
                    </div>
                    {paymentMethod === method.id && (
                      <div className="ml-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-success/20 text-success border border-success/50 uppercase tracking-wider">
                          Selected
                        </span>
                      </div>
                    )}
                  </label>
                ))}
              </div>

              {/* Payment Method Info */}
              <div className="mt-6 p-4 bg-background/50 rounded-lg border border-border">
                {paymentMethod === 'cod' && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-2xl mr-3">ℹ️</div>
                    <div>
                      <p className="text-sm text-gray-300 font-medium">
                        Pay in cash when your order is delivered to your
                        doorstep.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Please keep exact change ready for a smooth delivery
                        experience.
                      </p>
                    </div>
                  </div>
                )}
                {paymentMethod === 'stripe' && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-2xl mr-3">🔒</div>
                    <div>
                      <p className="text-sm text-gray-300 font-medium">
                        You'll be redirected to Stripe's secure payment gateway
                        to complete your purchase.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Accepts all major credit/debit cards with 256-bit
                        encryption.
                      </p>
                    </div>
                  </div>
                )}
                {/* {paymentMethod === 'razorpay' && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-2xl mr-3">⚡</div>
                    <div>
                      <p className="text-sm text-gray-300 font-medium">
                        Pay using UPI, Cards, NetBanking, Wallets, and more
                        through Razorpay.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Fast, secure, and supports multiple payment options.
                      </p>
                    </div>
                  </div>
                )} */}
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-surface p-6 rounded-lg lg:sticky lg:top-24 border border-border shadow-neon-purple/20">
              <h2 className="text-lg font-display font-bold text-white mb-4 border-b border-border pb-4">
                ORDER SUMMARY
              </h2>
              <div className="flow-root">
                <ul className="-my-4 divide-y divide-border mb-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex py-4">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-border">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-white">
                            <h3 className="line-clamp-1 font-display">
                              {item.name}
                            </h3>
                            <p className="ml-4 font-mono text-success">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-400">
                            Qty {item.quantity}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-border pt-4 space-y-4">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white font-mono">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Shipping</span>
                  <span
                    className={`font-mono ${
                      shipping === 0 ? 'text-success' : 'text-white'
                    }`}
                  >
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-white pt-4 border-t border-border">
                  <span className="font-display">TOTAL</span>
                  <span className="text-success font-mono text-shadow-glow">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                variant="cta"
                fullWidth
                size="lg"
                className="mt-6 text-lg"
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading
                  ? 'Placing Order...'
                  : paymentMethod === 'cod'
                    ? 'PLACE ORDER'
                    : `PAY WITH ${paymentMethods.find((m) => m.id === paymentMethod)?.name.toUpperCase()}`}
              </Button>
              {orderMsg && (
                <p className="mt-4 text-center text-sm text-success">
                  {orderMsg}
                </p>
              )}
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
