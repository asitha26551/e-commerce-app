import React, { useState, useEffect } from 'react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Plus } from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext';
import axios from 'axios';

export function AddProductModal({
  isOpen,
  onClose,
  onProductAdded
}) {
  // Always get token first
  const { state: { token } } = useAdminAuth();
  const [productImages, setProductImages] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');
  const [productTypeId, setProductTypeId] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  // Fetch categories with subcategories and product types
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/categories`, {
          headers: {
            'Content-Type': 'application/json',
            'token': token || '',
          },
        });
        setAllCategories(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };
    if (isOpen && token) fetchCategories();
  }, [isOpen, token]);

  // Update subcategories when category changes
  useEffect(() => {
    if (!categoryId) {
      setSubcategories([]);
      setSubcategoryId('');
      setProductTypes([]);
      setProductTypeId('');
      return;
    }
    const cat = allCategories && allCategories.find && allCategories.find(c => c._id === categoryId);
    setSubcategories(cat && Array.isArray(cat.subcategories) ? cat.subcategories : []);
    setSubcategoryId('');
    setProductTypes([]);
    setProductTypeId('');
  }, [categoryId, allCategories]);

  // Update product types when subcategory changes
  useEffect(() => {
    if (!subcategoryId) {
      setProductTypes([]);
      setProductTypeId('');
      return;
    }
    const sub = subcategories && subcategories.find && subcategories.find(s => s._id === subcategoryId);
    setProductTypes(sub && Array.isArray(sub.productTypes) ? sub.productTypes : []);
    setProductTypeId('');
  }, [subcategoryId, subcategories]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductImages((prev) => {
      const newFiles = files
        .slice(0, 4 - prev.length)
        .map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      return [...prev, ...newFiles].slice(0, 4);
    });
  };

  const handleRemoveImage = (index) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    // Client-side validation for required fields
    if (!name.trim() || !price || !categoryId || !subcategoryId) {
      setError('Please fill in all required fields: name, price, category, and subcategory.');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('stock', stock);
      formData.append('categoryId', categoryId);
      formData.append('subcategoryId', subcategoryId);
      formData.append('productTypeId', productTypeId);
      formData.append('description', description);
      formData.append('bestseller', bestseller ? 'true' : 'false');
      productImages.forEach((img, idx) => {
        formData.append(`image${idx + 1}`, img);
      });
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/product`, formData, {
        headers: {
          'token': token || '',
        },
      });
      setName('');
      setPrice('');
      setStock('');
      setCategoryId('');
      setSubcategoryId('');
      setProductTypeId('');
      setDescription('');
      setProductImages([]);
      setBestseller(false);
      onProductAdded && onProductAdded();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <Input label="Product Name" placeholder="e.g. Wireless Headphones" value={name} onChange={e => setName(e.target.value)} />

      <div className="grid grid-cols-2 gap-5">
        <Input label="Price" type="number" placeholder="0.00" value={price} onChange={e => setPrice(e.target.value)} />
        <Input label="Stock" type="number" placeholder="0" value={stock} onChange={e => setStock(e.target.value)} />
      </div>

      <div>
        <label className="block text-xs font-semibold text-text-secondary tracking-wide mb-1">
          Category
        </label>
        <select
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
          className="block w-full rounded-md border border-border bg-background text-text text-sm px-3 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">Select category</option>
          {allCategories.length > 0 ? (
            allCategories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))
          ) : (
            <option disabled>No categories</option>
          )}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-text-secondary tracking-wide mb-1">
          Subcategory
        </label>
        <select
          value={subcategoryId}
          onChange={e => setSubcategoryId(e.target.value)}
          className="block w-full rounded-md border border-border bg-background text-text text-sm px-3 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50"
          disabled={!categoryId || subcategories.length === 0}
        >
          <option value="">Select subcategory</option>
          {subcategories.length > 0 ? (
            subcategories.map((sub) => (
              <option key={sub._id} value={sub._id}>{sub.name}</option>
            ))
          ) : (
            <option disabled>No subcategories</option>
          )}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-text-secondary tracking-wide mb-1">
          Product Type
        </label>
        <select
          value={productTypeId}
          onChange={e => setProductTypeId(e.target.value)}
          className="block w-full rounded-md border border-border bg-background text-text text-sm px-3 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50"
          disabled={!subcategoryId || productTypes.length === 0}
        >
          <option value="">Select product type</option>
          {productTypes.length > 0 ? (
            productTypes.map((pt) => (
              <option key={pt._id} value={pt._id}>{pt.name}</option>
            ))
          ) : (
            <option disabled>No product types</option>
          )}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-text-secondary tracking-wide mb-1">
          Description
        </label>
        <textarea
          rows={3}
          placeholder="Enter product description..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="block w-full rounded-md border border-border bg-background text-text text-sm px-3 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={e => setBestseller(e.target.checked)}
          className="mr-2 h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary"
        />
        <label htmlFor="bestseller" className="text-sm font-medium text-text-secondary">Bestseller</label>
      </div>

      <div>
        <label className="block text-xs font-semibold text-text-secondary tracking-wide mb-1">
          Product Images (up to 4)
        </label>
        <div className="flex flex-wrap gap-4 mt-3">
          {[0, 1, 2, 3].map((idx) => {
            const img = productImages[idx];
            return (
              <div key={idx} className="relative w-20 h-20">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  id={`product-image-input-${idx}`}
                  onChange={e => {
                    const file = e.target.files && e.target.files[0];
                    if (file) {
                      const newImages = [...productImages];
                      newImages[idx] = Object.assign(file, { preview: URL.createObjectURL(file) });
                      setProductImages(newImages);
                    }
                  }}
                />
                {img ? (
                  <>
                    <img
                      src={img.preview}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded border border-border cursor-pointer"
                      onClick={() => document.getElementById(`product-image-input-${idx}`).click()}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute -top-2 -right-2 bg-error text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <div
                    className="w-20 h-20 flex items-center justify-center border border-dashed border-border rounded bg-background text-text-secondary cursor-pointer hover:border-primary hover:text-primary transition-colors"
                    onClick={() => document.getElementById(`product-image-input-${idx}`).click()}
                  >
                    <Plus className="h-5 w-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {error && <div className="text-error text-sm">{error}</div>}

      <div className="pt-4 flex justify-end gap-3 border-t border-border mt-4">
        <Button variant="outline" type="button" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Product'}
        </Button>
      </div>
    </form>
  );
}
