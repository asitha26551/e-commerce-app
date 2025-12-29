// CartItem.jsx
import React from 'react'
import { Trash2, Minus, Plus } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b border-border last:border-0">
      {/* Image */}
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border bg-background">
        <img
          src={item.images[0]}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Details */}
      <div className="ml-4 flex-1 flex flex-col sm:flex-row sm:justify-between w-full">
        <div className="flex-1">
          <h3 className="text-base font-medium text-white font-display">
            <a href={`/products/${item.id}`}>{item.name}</a>
          </h3>
          <p className="mt-1 text-sm text-gray-400">{item.category}</p>
          <div className="mt-1 flex text-sm text-gray-400 space-x-4">
            {item.selectedColor && <p>Color: {item.selectedColor}</p>}
            {item.selectedSize && <p>Size: {item.selectedSize}</p>}
          </div>
          <p className="mt-1 font-medium text-success sm:hidden font-mono">
            ${item.price.toFixed(2)}
          </p>
        </div>

        {/* Quantity & Price */}
        <div className="mt-4 sm:mt-0 flex items-center justify-between sm:space-x-6">
          <div className="flex items-center border border-border rounded-md bg-background">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1 text-gray-300 hover:bg-surface disabled:opacity-50"
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-2 text-white font-medium w-8 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1 text-gray-300 hover:bg-surface"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <p className="hidden sm:block font-bold text-success w-20 text-right font-mono">
              ${ (item.price * item.quantity).toFixed(2) }
            </p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-gray-500 hover:text-error transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
