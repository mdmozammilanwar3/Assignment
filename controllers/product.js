// load db
const { connectToDatabase } = require('../db/dbConnection');
// call connectToDatabase() to connect DB
connectToDatabase();
const Product = require('../models/product');
const {productValidation } = require('../utilities/productValidation');

const getProducts = async (req,res,next) =>{
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
const createProduct = async (req, res, next) => {
    console.log(`In create product controller`);
    // Logic to create a new product
    const { error } = productValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({message:"Product Created Sucessfully",data:product});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
  
const getProductById = async (req, res, next) => {
    // Logic to fetch a product by ID
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
  
const updateProduct = async (req, res, next) => {
    // Logic to update a product
    const { error } = productValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
  
const deleteProduct = async (req, res, next) => {
    // Logic to delete a product
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
module.exports = {getProducts,createProduct,getProductById,updateProduct,deleteProduct};