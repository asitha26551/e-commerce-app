import Subcategory from './Subcategory.model.js';
import ProductType from './ProductType.model.js';

// Get all categories with subcategories and product types
export const getCategories = async (req, res) => {
  try {
    // Get all categories
    const categories = await Category.find();
    // For each category, get subcategories
    const categoriesWithSubs = await Promise.all(categories.map(async (cat) => {
      const subcategories = await Subcategory.find({ categoryId: cat._id });
      // For each subcategory, get product types
      const subcategoriesWithTypes = await Promise.all(subcategories.map(async (sub) => {
        const productTypes = await ProductType.find({ subcategoryId: sub._id });
        return {
          _id: sub._id,
          name: sub.name,
          productTypes: productTypes.map(pt => ({ _id: pt._id, name: pt.name })),
        };
      }));
      return {
        _id: cat._id,
        name: cat.name,
        subcategories: subcategoriesWithTypes,
      };
    }));
    res.json(categoriesWithSubs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
import Category from './Category.model.js';

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
