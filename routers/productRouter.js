const express = require('express');
const router = express.Router();
const {getProducts,createProduct,getProductById,updateProduct,deleteProduct} = require('../controllers/product');
const {authenticateToken}=require("../auth/auth");
router.get("/products",authenticateToken,getProducts);
router.post('/product', authenticateToken,createProduct);
router.get('/product/:id',authenticateToken, getProductById);
router.put('/product/:id',authenticateToken,updateProduct);
router.delete('/product/:id',authenticateToken,deleteProduct);
module.exports = router;

