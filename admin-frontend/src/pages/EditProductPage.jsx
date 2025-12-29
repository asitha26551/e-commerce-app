import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Plus } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state: { token } } = useAdminAuth();

  const [product, setProduct] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: '',
    price: '',
    stock: '',
    categoryId: '',
    subcategoryId: '',
    productTypeId: '',
    description: '',
    bestseller: false,
    brand: '',
    condition: 'new',
    images: [],
  });
  const [newImages, setNewImages] = useState([]);

  // Fetch product and categories
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [prodRes, catRes] = await Promise.all([
          axios.get(`/api/product/${id}`),
          axios.get('/api/categories', {
            headers: { token: token || '' },
          }),
        ]);
        const prod = prodRes.data.product;
        setProduct(prod);
        setForm({
          name: prod.name || '',
          price: prod.price || '',
          stock: prod.stock || '',
          categoryId: prod.categoryId?._id || prod.categoryId || '',
          subcategoryId: prod.subcategoryId?._id || prod.subcategoryId || '',
          productTypeId: prod.productTypeId?._id || prod.productTypeId || '',
          description: prod.description || '',
          bestseller: !!prod.bestseller,
          brand: prod.brand || '',
          condition: prod.condition || 'new',
          images: prod.images || [],
        });
        setAllCategories(Array.isArray(catRes.data) ? catRes.data : []);
      } catch (err) {
        setError('Failed to load product or categories');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, token]);

  // Update subcategories and product types when category/subcategory changes
  useEffect(() => {
    if (!form.categoryId) {
      setSubcategories([]);
      setProductTypes([]);
      return;
    }
    const cat = allCategories.find(c => c._id === form.categoryId);
    setSubcategories(cat && Array.isArray(cat.subcategories) ? cat.subcategories : []);
  }, [form.categoryId, allCategories]);

  useEffect(() => {
    if (!form.subcategoryId) {
      setProductTypes([]);
      return;
    }
    const sub = subcategories.find(s => s._id === form.subcategoryId);
    setProductTypes(sub && Array.isArray(sub.productTypes) ? sub.productTypes : []);
  }, [form.subcategoryId, subcategories]);

  const handleInput = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = e => {
    const files = Array.from(e.target.files || []);
    setNewImages(prev => {
      const newFiles = files
        .slice(0, 4 - prev.length)
        .map(file => Object.assign(file, { preview: URL.createObjectURL(file) }));
      return [...prev, ...newFiles].slice(0, 4);
    });
  };

  const handleRemoveImage = idx => {
    setNewImages(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    if (!form.name.trim() || !form.price || !form.categoryId || !form.subcategoryId) {
      setError('Please fill in all required fields: name, price, category, and subcategory.');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('price', form.price);
      formData.append('stock', form.stock);
      formData.append('categoryId', form.categoryId);
      formData.append('subcategoryId', form.subcategoryId);
      formData.append('productTypeId', form.productTypeId);
      formData.append('description', form.description);
      formData.append('bestseller', form.bestseller ? 'true' : 'false');
      formData.append('brand', form.brand);
      formData.append('condition', form.condition);
      newImages.forEach((img, idx) => {
        formData.append(`image${idx + 1}`, img);
      });
      await axios.put(`/api/product/${id}`, formData, {
        headers: {
          token: token || '',
        },
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-background text-text flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen bg-background text-error flex items-center justify-center">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <Navbar />
      <main className="flex-grow max-w-5xl mx-auto px-4 py-10 w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-display font-bold text-white">Edit Product</h1>
          <p className="text-text-secondary">Update product details for your GAMEZONE store.</p>
        </div>
        <form className="space-y-6 bg-surface border border-border rounded-xl p-6 shadow-neon-purple/20" onSubmit={handleSubmit}>
          <Input label="Product Name" name="name" value={form.name} onChange={handleInput} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input label="Price" name="price" type="number" value={form.price} onChange={handleInput} />
            <Input label="Stock" name="stock" type="number" value={form.stock} onChange={handleInput} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-text-secondary tracking-wide mb-1">Category</label>
              <select name="categoryId" value={form.categoryId} onChange={handleInput} className="block w-full rounded-md border border-border bg-background text-text text-sm px-3 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
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
              <label className="block text-xs font-semibold text-text-secondary tracking-wide mb-1">Subcategory</label>
              <select name="subcategoryId" value={form.subcategoryId} onChange={handleInput} className="block w-full rounded-md border border-border bg-background text-text text-sm px-3 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50" disabled={!form.categoryId || subcategories.length === 0}>
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
              <label className="block text-xs font-semibold text-text-secondary tracking-wide mb-1">Product Type</label>
              <select name="productTypeId" value={form.productTypeId} onChange={handleInput} className="block w-full rounded-md border border-border bg-background text-text text-sm px-3 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50" disabled={!form.subcategoryId || productTypes.length === 0}>
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
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-secondary tracking-wide mb-1">Description</label>
            <textarea name="description" rows={3} value={form.description} onChange={handleInput} className="block w-full rounded-md border border-border bg-background text-text text-sm px-3 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="bestseller" name="bestseller" checked={form.bestseller} onChange={handleInput} className="mr-2 h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary" />
            <label htmlFor="bestseller" className="text-sm font-medium text-text-secondary">Mark as Bestseller</label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input label="Brand" name="brand" value={form.brand} onChange={handleInput} />
            <div>
              <label className="block text-xs font-semibold text-text-secondary tracking-wide mb-1">Condition</label>
              <select name="condition" value={form.condition} onChange={handleInput} className="block w-full rounded-md border border-border bg-background text-text text-sm px-3 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-secondary tracking-wide mb-1">Current Images</label>
            <div className="flex flex-wrap gap-4 mt-3">
              {form.images && form.images.length > 0 ? form.images.map((img, idx) => (
                <img key={idx} src={img.imageUrl} alt="Product" className="w-20 h-20 object-cover rounded border border-border" />
              )) : <span className="text-text-secondary">No images</span>}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-secondary tracking-wide mb-1">Replace Images (up to 4)</label>
            <div className="flex flex-wrap gap-4 mt-3">
              {[0, 1, 2, 3].map((idx) => {
                const img = newImages[idx];
                return (
                  <div key={idx} className="relative w-20 h-20">
                    <input type="file" accept="image/*" style={{ display: 'none' }} id={`product-image-input-${idx}`} onChange={handleImageChange} />
                    {img ? (
                      <>
                        <img src={img.preview} alt="Preview" className="w-20 h-20 object-cover rounded border border-border cursor-pointer" onClick={() => document.getElementById(`product-image-input-${idx}`)?.click()} />
                        <button type="button" onClick={() => handleRemoveImage(idx)} className="absolute -top-2 -right-2 bg-error text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">×</button>
                      </>
                    ) : (
                      <div className="w-20 h-20 flex items-center justify-center border border-dashed border-border rounded bg-background text-text-secondary cursor-pointer hover:border-primary hover:text-primary transition-colors" onClick={() => document.getElementById(`product-image-input-${idx}`)?.click()}>
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
            <Button variant="outline" type="button" onClick={() => navigate(-1)} disabled={loading}>Cancel</Button>
            <Button variant="primary" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Update Product'}</Button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
