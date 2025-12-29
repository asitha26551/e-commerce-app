import React, { useEffect, useState } from 'react'
import { useAdminAuth } from '../../context/AdminAuthContext';
import { motion } from 'framer-motion'
import { Edit, Trash2 } from 'lucide-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function ProductsTab() {
  const { state: { token } } = useAdminAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/product');
      // Use data.products if present (backend returns { products: [...] })
      const arr = Array.isArray(res.data.products) ? res.data.products : [];
      setProducts(arr.map(p => ({
        id: p._id,
        name: p.name,
        price: p.price,
        stock: p.stock,
        images: p.images && p.images.length ? (Array.isArray(p.images) ? p.images.map(img => img.imageUrl || "/placeholder.png") : ["/placeholder.png"]) : ["/placeholder.png"],
        category: p.categoryId && p.categoryId.name ? p.categoryId.name : (p.categoryId || ''),
      })));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`/api/product/${id}`, {
        headers: {
          'token': token || '',
        },
      });
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  if (loading) return <div className="p-6 text-text-secondary">Loading products...</div>;
  if (error) return <div className="p-6 text-error">{error}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-x-auto"
    >
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-surface">
          <tr>
            {['Product', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map(
              (col) => (
                <th
                  key={col}
                  className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                >
                  {col}
                </th>
              )
            )}
          </tr>
        </thead>

        <tbody className="bg-surface divide-y divide-border">
          {products.length > 0 ? (
            products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-background/60 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-10 w-10 rounded-lg object-cover border border-gray-200"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-text line-clamp-1 max-w-xs">
                        {product.name}
                      </div>
                      <div className="text-xs text-text-secondary">
                        ID: {product.id}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-background text-text-secondary border border-border">
                    {product.category}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-text">
                    ${product.price.toFixed(2)}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text">
                    {product.stock} units
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-0.5 inline-flex text-xs font-semibold rounded-full ${
                      product.stock > 0
                        ? 'bg-success/20 text-success border border-success/50'
                        : 'bg-error/20 text-error border border-error/50'
                    }`}
                  >
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-text-secondary hover:text-accent mr-3"
                    onClick={() => navigate(`/products/${product.id}/edit`)}
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-text-secondary hover:text-error" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="text-center py-8 text-text-secondary"
              >
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </motion.div>
  )
}
