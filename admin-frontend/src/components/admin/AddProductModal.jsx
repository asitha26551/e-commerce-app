import React, { useState } from 'react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Modal } from '../ui/Modal'
import { Plus } from 'lucide-react'

export function AddProductModal({
  isOpen,
  onClose,
  categories = []
}) {
  const [productImages, setProductImages] = useState([])

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setProductImages((prev) => {
      const newFiles = files
        .slice(0, 4 - prev.length)
        .map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      return [...prev, ...newFiles].slice(0, 4)
    })
  }

  const handleRemoveImage = (index) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Product">
      <form className="space-y-5">
        <Input label="Product Name" placeholder="e.g. Wireless Headphones" />

        <div className="grid grid-cols-2 gap-5">
          <Input label="Price" type="number" placeholder="0.00" />
          <Input label="Stock" type="number" placeholder="0" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select className="block w-full rounded-md border border-gray-300 p-2 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
            {categories.length > 0 ? (
              categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))
            ) : (
              <option disabled>No categories</option>
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            rows={3}
            placeholder="Enter product description..."
            className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Images (up to 4)
          </label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            disabled={productImages.length >= 4}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />

          <div className="flex flex-wrap gap-4 mt-3">
            {[0, 1, 2, 3].map((idx) => {
              const img = productImages[idx]
              return img ? (
                <div key={idx} className="relative w-20 h-20">
                  <img
                    src={img.preview}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div
                  key={idx}
                  className="w-20 h-20 flex items-center justify-center border border-dashed border-gray-300 rounded bg-gray-50 text-gray-300"
                >
                  <Plus className="h-5 w-5" />
                </div>
              )
            })}
          </div>
        </div>

        <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="button" onClick={onClose}>
            Save Product
          </Button>
        </div>
      </form>
    </Modal>
  )
}
