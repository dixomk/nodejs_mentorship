const products = require('../models/products-model.json');
const reviews = require('../models/reviews-for-products.json');

class ProductsRestApi {
    static getAllProducts(req, res) {
        res.json(products);
    }

    static getProductById(req, res) {
        const{id:productID} = req.params;
        const findedProduct = productID
            ? products.reduce((tmp, prd) => {
                productID === prd.id ? tmp = prd : null;
                return tmp;
            }, {})
            : {};

        res.json(findedProduct);
    }

    static getReviewsForProduct(req, res) {
        const{id:productID} = req.params;
        const findedReviews = productID
            ? reviews.reduce((tmp, productReviews) => {
                productID === productReviews.productID ? tmp = tmp.concat(productReviews.reviews) : null;
                return tmp;
            }, [])
            : [];

        res.json(findedReviews);
    }

    static addNewProduct(req, res) {
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