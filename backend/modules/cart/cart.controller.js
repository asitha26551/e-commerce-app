

import CartItem from './CartItem.model.js';

// Helper to build cartData map (productId -> total quantity)
const buildCartDataForUser = async (userId) => {
    const items = await CartItem.find({ userId });
    const cartData = {};
    for (const item of items) {
        const key = String(item.productId);
        cartData[key] = (cartData[key] || 0) + item.quantity;
    }
    return cartData;
};

// Add products to user cart using CartItem documents
const addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId, variantId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ success: false, message: 'productId is required' });
        }

        const query = { userId, productId };
        if (variantId) query.variantId = variantId;

        let cartItem = await CartItem.findOne(query);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cartItem = new CartItem({ userId, productId, variantId: variantId || undefined, quantity: 1 });
        }

        await cartItem.save();

        const cartData = await buildCartDataForUser(userId);
        res.json({ success: true, message: 'Added to cart', cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update user cart (set quantity or remove item) using CartItem
const updateCart = async (req, res) => {
    try {
        const userId = req.userId;
        const productId = req.params.itemId || req.body.productId;
        const { quantity, variantId } = req.body;

        if (!userId || !productId || typeof quantity !== 'number') {
            return res.status(400).json({ success: false, message: 'productId and numeric quantity are required' });
        }

        const query = { userId, productId };
        if (variantId) query.variantId = variantId;

        if (quantity > 0) {
            await CartItem.findOneAndUpdate(
                query,
                { $set: { quantity } },
                { upsert: true }
            );
        } else {
            await CartItem.deleteMany(query);
        }

        const cartData = await buildCartDataForUser(userId);
        res.json({ success: true, message: 'Cart updated', cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get user cart using CartItem
const getUserCart = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).json({ success: false, message: 'Authentication required' });
        }

        const cartData = await buildCartDataForUser(userId);
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    addToCart,
    updateCart,
    getUserCart
};