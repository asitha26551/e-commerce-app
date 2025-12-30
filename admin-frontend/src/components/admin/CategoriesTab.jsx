
import { useEffect, useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Edit, Plus } from 'lucide-react';
import { AddCategoryModal } from './AddCategoryModal';
import { AddSubcategoryModal } from './AddSubcategoryModal';
import { AddProductTypeModal } from './AddProductTypeModal';
import axios from 'axios';

export function CategoriesTab() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const { state: { token } } = useAdminAuth();
  const [showAddSubModal, setShowAddSubModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddTypeModal, setShowAddTypeModal] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/categories', {
        headers: {
          'Content-Type': 'application/json',
          'token': token || '',
        },
      });
      setCategories(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add subcategory via API; used by AddSubcategoryModal through onAdd
  const handleAddSubcategory = async (name) => {
    if (!selectedCategory) {
      throw new Error('No category selected');
    }
    await axios.post('/api/subcategory', { name, categoryId: selectedCategory._id }, {
      headers: {
        'Content-Type': 'application/json',
        'token': token || '',
      },
    });
    setShowAddSubModal(false);
    await fetchCategories();
  };

  const handleAddProductType = async (name) => {
    if (!selectedSubcategory) {
      throw new Error('No subcategory selected');
    }
    await axios.post('/api/product-type', { name, subcategoryId: selectedSubcategory._id }, {
      headers: {
        'Content-Type': 'application/json',
        'token': token || '',
      },
    });
    setShowAddTypeModal(false);
    await fetchCategories();
  };

  return (
    <div className="p-6 space-y-6">
      {loading && <div className="text-text-secondary">Loading...</div>}
      {error && <div className="text-error">{error}</div>}
      {!loading && !error && categories.map(category => (
        <div
          key={category._id}
          className="bg-surface border border-border rounded-xl p-6 space-y-4 shadow-neon-purple/10"
        >
          {/* Category Header */}
          <div className="flex items-center gap-4">
            {/* No image in backend, placeholder */}
            <div className="h-16 w-16 rounded-lg bg-background flex items-center justify-center text-text-secondary border border-border">
              <Edit className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-display font-bold text-text">
                {category.name}
              </h3>
              <p className="text-sm text-text-secondary">
                {category.subcategories.length} subcategories
              </p>
            </div>

            <button className="text-accent hover:text-primary">
              <Edit className="h-4 w-4" />
            </button>
          </div>

          {/* Subcategories */}
          <div className="pl-4 space-y-3 border-l border-border/60">
            {category.subcategories.map(sub => (
              <div key={sub._id} className="space-y-2">
                {/* Subcategory Header */}
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-text">
                    {sub.name}
                  </h4>

                  <button
                    className="text-xs text-accent flex items-center gap-1"
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedSubcategory(sub);
                      setShowAddTypeModal(true);
                    }}
                  >
                    <Plus className="h-3 w-3" />
                    Add Product Type
                  </button>
                </div>

                {/* Product Types */}
                <div className="flex flex-wrap gap-2 pl-4">
                  {sub.productTypes.map(type => (
                    <span
                      key={type._id}
                      className="px-3 py-1 text-xs rounded-full bg-background text-text-secondary border border-border"
                    >
                      {type.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Add Subcategory */}
            <button
              className="mt-2 text-sm text-accent flex items-center gap-1"
              onClick={() => {
                setSelectedCategory(category);
                setShowAddSubModal(true);
              }}
            >
              <Plus className="h-4 w-4" />
              Add Subcategory
            </button>
          </div>
        </div>
      ))}

      {/* Add Category */}
      <button
        className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-text-secondary hover:border-primary hover:text-text transition"
        onClick={() => setShowAddModal(true)}
      >
        <Plus className="h-6 w-6 mb-2" />
        <span className="font-medium">Add Category</span>
      </button>

      <AddCategoryModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={fetchCategories}
        token={token}
      />
      <AddSubcategoryModal
        isOpen={showAddSubModal}
        onClose={() => setShowAddSubModal(false)}
        onAdd={handleAddSubcategory}
        categoryName={selectedCategory ? selectedCategory.name : ''}
      />
      <AddProductTypeModal
        isOpen={showAddTypeModal}
        onClose={() => setShowAddTypeModal(false)}
        onAdd={handleAddProductType}
        categoryName={selectedCategory ? selectedCategory.name : ''}
        subcategoryName={selectedSubcategory ? selectedSubcategory.name : ''}
      />
    </div>
  );
}
