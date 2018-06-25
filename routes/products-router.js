const express = require('express');
const ProductsRestApiController = require('../controllers/products-rest-api-controler');

const productsRestApiController = new ProductsRestApiController();
const{getAllProducts, getProductById, getReviewsForProduct, addNewProduct} = productsRestApiController;

const produtcsRouter = express.Router();

produtcsRouter
    .get('/', getAllProducts)
    .get('/:id', getProductById)
    .get('/:id/reviews', getReviewsForProduct)
    .post('/', addNewProduct);
    
module.exports = produtcsRouter;