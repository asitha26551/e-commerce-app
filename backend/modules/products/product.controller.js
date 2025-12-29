//function for updating a product by id
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            description,
            price,
            stock,
            categoryId,
            subcategoryId,
            productTypeId,
            brand,
            condition,
            bestseller
        } = req.body;

        // Validate required fields
        if (!name || !price || !categoryId || !subcategoryId) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: name, price, categoryId, and subcategoryId are required'
            });
        }

        // Find the product
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Update product fields
        product.name = name;
        product.description = description;
        product.price = Number(price);
        product.stock = stock ? Number(stock) : 0;
        product.categoryId = categoryId;
        product.subcategoryId = subcategoryId;
        product.productTypeId = productTypeId || undefined;
        product.brand = brand;
        product.condition = condition || 'new';
        product.bestseller = (typeof bestseller === 'string') ? bestseller === 'true' : !!bestseller;

        await product.save();

        // Handle image uploads (replace images if new ones are uploaded)
        const images = [];
        const imageFields = ['image1', 'image2', 'image3', 'image4'];
        let newImagesUploaded = false;
        for (let i = 0; i < imageFields.length; i++) {
            const fieldName = imageFields[i];
            if (req.files && req.files[fieldName]) {
                newImagesUploaded = true;
                const file = req.files[fieldName][0];
                // Upload to Cloudinary
                const result = await cloudinary.uploader.upload(file.path, {
                    resource_type: 'image',
                    folder: 'products'
                });
                // Create ProductImage document
                const productImage = new ProductImage({
                    productId: product._id,
                    imageUrl: result.secure_url,
                    isMain: i === 0
                });
                await productImage.save();
                images.push(productImage);
            }
        }
        // If new images uploaded, remove old images
        if (newImagesUploaded) {
            const oldImages = await ProductImage.find({ productId: product._id });
            for (const image of oldImages) {
                // Extract public_id from Cloudinary URL and delete
                const urlParts = image.imageUrl.split('/');
                const publicIdWithExt = urlParts.slice(-2).join('/');
                const publicId = publicIdWithExt.split('.')[0];
                try {
                    await cloudinary.uploader.destroy(publicId);
                } catch (cloudinaryError) {
                    console.error('Error deleting image from Cloudinary:', cloudinaryError);
                }
            }
            await ProductImage.deleteMany({ productId: product._id });
            // Save new images (already done above)
        }

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product,
            images
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update product',
            error: error.message
        });
    }
}
import Product from './Product.model.js';
import ProductImage from './ProductImage.model.js';
import ProductVariant from './ProductVariant.model.js';
import { v2 as cloudinary } from 'cloudinary';

//function for adding a new product
const addProduct = async (req, res) => {
    try {
        const {
            name, 
            description, 
            price, 
            stock, 
            categoryId, 
            subcategoryId, 
            productTypeId,
            brand,
            condition,
            variants, // optional: JSON string of variants [{size, color, stock}]
            bestseller // optional: boolean
        } = req.body;

        // Validate required fields
        if (!name || !price || !categoryId || !subcategoryId) {
            return res.status(400).json({ 
                success: false, 
                message: 'Missing required fields: name, price, categoryId, and subcategoryId are required' 
            });
        }

        // Create the product
        const product = new Product({
            name,
            description,
            price: Number(price),
            stock: stock ? Number(stock) : 0,
            categoryId,
            subcategoryId,
            productTypeId: productTypeId || undefined,
            brand,
            condition: condition || 'new',
            bestseller: (typeof bestseller === 'string') ? bestseller === 'true' : !!bestseller
        });

        await product.save();

        // Handle image uploads
        const images = [];
        const imageFields = ['image1', 'image2', 'image3', 'image4'];
        
        for (let i = 0; i < imageFields.length; i++) {
            const fieldName = imageFields[i];
            if (req.files && req.files[fieldName]) {
                const file = req.files[fieldName][0];
                
                // Upload to Cloudinary
                const result = await cloudinary.uploader.upload(file.path, {
                    resource_type: 'image',
                    folder: 'products'
                });

                // Create ProductImage document
                const productImage = new ProductImage({
                    productId: product._id,
                    imageUrl: result.secure_url,
                    isMain: i === 0 // First image is main
                });

                await productImage.save();
                images.push(productImage);
            }
        }

        // Handle variants if provided
        let productVariants = [];
        if (variants) {
            try {
                const variantsData = JSON.parse(variants);
                if (Array.isArray(variantsData)) {
                    for (const variantData of variantsData) {
                        const variant = new ProductVariant({
                            productId: product._id,
                            size: variantData.size,
                            color: variantData.color,
                            stock: variantData.stock || 0
                        });
                        await variant.save();
                        productVariants.push(variant);
                    }
                }
            } catch (parseError) {
                console.error('Error parsing variants:', parseError);
            }
        }

        res.status(201).json({ 
            success: true, 
            message: 'Product added successfully',
            product,
            images,
            variants: productVariants
        });

    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to add product', 
            error: error.message 
        });
    }
}

//function for getting all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('categoryId', 'name')
            .populate('subcategoryId', 'name')
            .populate('productTypeId', 'name')
            .sort({ createdAt: -1 });

        // Get images for each product
        const productsWithImages = await Promise.all(
            products.map(async (product) => {
                const images = await ProductImage.find({ productId: product._id });
                const variants = await ProductVariant.find({ productId: product._id });
                return {
                    ...product.toObject(),
                    images,
                    variants
                };
            })
        );

        res.status(200).json({ 
            success: true, 
            count: productsWithImages.length,
            products: productsWithImages 
        });

    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to retrieve products', 
            error: error.message 
        });
    }
}

//function for removing a product by id
const removeProductById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the product
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: 'Product not found' 
            });
        }

        // Delete associated images from Cloudinary
        const images = await ProductImage.find({ productId: id });
        for (const image of images) {
            // Extract public_id from Cloudinary URL and delete
            const urlParts = image.imageUrl.split('/');
            const publicIdWithExt = urlParts.slice(-2).join('/');
            const publicId = publicIdWithExt.split('.')[0];
            
            try {
                await cloudinary.uploader.destroy(publicId);
            } catch (cloudinaryError) {
                console.error('Error deleting image from Cloudinary:', cloudinaryError);
            }
        }

        // Delete images from database
        await ProductImage.deleteMany({ productId: id });

        // Delete variants
        await ProductVariant.deleteMany({ productId: id });

        // Delete the product
        await Product.findByIdAndDelete(id);

        res.status(200).json({ 
            success: true, 
            message: 'Product and associated data deleted successfully' 
        });

    } catch (error) {
        console.error('Error removing product:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to remove product', 
            error: error.message 
        });
    }
}

//get a product by id
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id)
            .populate('categoryId', 'name')
            .populate('subcategoryId', 'name')
            .populate('productTypeId', 'name');

        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: 'Product not found' 
            });
        }

        // Get images and variants
        const images = await ProductImage.find({ productId: id });
        const variants = await ProductVariant.find({ productId: id });

        res.status(200).json({ 
            success: true, 
            product: {
                ...product.toObject(),
                images,
                variants
            }
        });

    } catch (error) {
        console.error('Error getting product:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to retrieve product', 
            error: error.message 
        });
    }
}


// Get best seller products
const getBestSellers = async (req, res) => {
    try {
        const products = await Product.find({ bestseller: true })
            .populate('categoryId', 'name')
            .populate('subcategoryId', 'name')
            .populate('productTypeId', 'name')
            .sort({ createdAt: -1 });

        const productsWithImages = await Promise.all(
            products.map(async (product) => {
                const images = await ProductImage.find({ productId: product._id });
                const variants = await ProductVariant.find({ productId: product._id });
                return {
                    ...product.toObject(),
                    images,
                    variants
                };
            })
        );

        res.status(200).json({
            success: true,
            count: productsWithImages.length,
            products: productsWithImages
        });
    } catch (error) {
        console.error('Error getting best sellers:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve best sellers',
            error: error.message
        });
    }
}

export {
    addProduct,
    getAllProducts,
    removeProductById,
    getProductById,
    getBestSellers
    ,updateProduct
}