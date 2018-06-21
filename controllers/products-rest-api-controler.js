const products = require('../models/products-model.json');
const reviews = require('../models/reviews-for-products.json');

class ProductsRestApi {
    constructor() {
        this.getAllProducts = this.getAllProducts.bind(this);
        this.getProductById = this.getProductById.bind(this);
        this.getReviewsForProduct = this.getReviewsForProduct.bind(this);
        this.addNewProduct = this.addNewProduct.bind(this);
    }

    getAllProducts(req, res) {
        res.json(products);
    }
   
    getProductById(req, res, next) {
        const{id:productID} = req.params;
        const findedProduct = productID
            ? products.reduce((tmp, prd) => {
                productID === prd.id ? tmp = prd : null;
                return tmp;
            }, {})
            : {};
        if(!findedProduct.id) {
            next(new Error('Error: Product not found !'));
        }else {
            res.json(findedProduct);
        }
    }

    getReviewsForProduct(req, res) {
        const{id:productID} = req.params;
        const findedReviews = productID
            ? reviews.reduce((tmp, productReviews) => {
                productID === productReviews.productID ? tmp = tmp.concat(productReviews.reviews) : null;
                return tmp;
            }, [])
            : [];

        res.json(findedReviews);
    }

    addNewProduct(req, res) {
        const{id, title, description, price} = req.body; 
        newProduct = {
            id,
            title,
            description,
            price
        };
        products.push(newProduct);

        res.json(newProduct);
    }
}

module.exports = ProductsRestApi;