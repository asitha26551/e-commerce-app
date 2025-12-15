import React from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { useCart } from '../context/CartContext'

export function CheckoutPage() {
  const { cartTotal, items } = useCart()
  const shipping = cartTotal > 50 ? 0 : 10
  const tax = cartTotal * 0.08
  const total = cartTotal + shipping + tax

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
                <Input label="First Name" placeholder="John" />
                <Input label="Last Name" placeholder="Doe" />
                <Input label="Email" type="email" placeholder="john@example.com" className="md:col-span-2" />
                <Input label="Address" placeholder="123 Main St" className="md:col-span-2" />
                <Input label="City" placeholder="New York" />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="State" placeholder="NY" />
                  <Input label="ZIP" placeholder="10001" />
                </div>
              </div>
            </section>

            {/* Delivery Options */}
            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Delivery Method</h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <div className="flex items-center">
                    <input type="radio" name="delivery" className="h-4 w-4 text-primary focus:ring-primary" defaultChecked />
                    <div className="ml-3">
                      <span className="block text-sm font-medium text-gray-900">Standard Delivery</span>
                      <span className="block text-sm text-gray-500">3-5 business days</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">Free</span>
                </label>
                <label className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <div className="flex items-center">
                    <input type="radio" name="delivery" className="h-4 w-4 text-primary focus:ring-primary" />
                    <div className="ml-3">
                      <span className="block text-sm font-medium text-gray-900">Express Delivery</span>
                      <span className="block text-sm text-gray-500">1-2 business days</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">$15.00</span>
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
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 pt-4 border-t border-gray-200">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button variant="cta" fullWidth size="lg" className="mt-6">
                Place Order
              </Button>
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
