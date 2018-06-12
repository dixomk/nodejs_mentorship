const express = require('express');
const productsRestApiController = require('../controllers/products-rest-api-controler');

const produtcsRouter = express.Router();

produtcsRouter
    .get('/', productsRestApiController.getAllProducts)
    .get('/:id', productsRestApiController.getProductById)
    .get('/:id/reviews', productsRestApiController.getReviewsForProduct)
    .post('/', productsRestApiController.addNewProduct);
    
module.exports = produtcsRouter;