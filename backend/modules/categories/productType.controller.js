import ProductType from './ProductType.model.js';

export const addProductType = async (req, res) => {
  try {
    const { name, subcategoryId } = req.body;
    if (!name || !subcategoryId) return res.status(400).json({ message: 'Name and subcategoryId are required' });
    const productType = new ProductType({ name, subcategoryId });
    await productType.save();
    res.status(201).json(productType);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
