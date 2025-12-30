import Subcategory from './Subcategory.model.js';

export const getSubcategories = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const filter = categoryId ? { categoryId } : {};
    const subcategories = await Subcategory.find(filter).populate('categoryId', 'name');
    res.json(subcategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addSubcategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    if (!name || !categoryId) return res.status(400).json({ message: 'Name and categoryId are required' });
    const subcategory = new Subcategory({ name, categoryId });
    await subcategory.save();
    res.status(201).json(subcategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
