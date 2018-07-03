const models = require('../models');

class ProductsRestApi {
    constructor() {
        this.getAllProducts = this.getAllProducts.bind(this);
        this.getProductById = this.getProductById.bind(this);
        this.getReviewsForProduct = this.getReviewsForProduct.bind(this);
        this.addNewProduct = this.addNewProduct.bind(this);
    }

    getAllProducts(req, res) {
        models.Product.findAll()
        .then(products => {
            res.json(products);
        })
        .catch(err => {
            res.status('500')
                .json({status: '500', message: 'Server error'});
        });
    }
   
    getProductById(req, res, next) {
        const{id:productId} = req.params;
        models.Product.findOne({
            where: {
                id: productId
            },
            attributes: ['id', 'title', 'description', 'price']
        })
        .then(product => {
            if(!product) {
                next(new Error('Error: Product not found !'));
            }else {
                res.json(product);
            }
        })
        .catch(console.log);
    }

    getReviewsForProduct(req, res) {
        const{id:productId} = req.params;
        models.Review.findOne({
            where: {
                productId: productId
            },
            attributes: ['description']
        })
        .then(review => res.json(review || {}))
        .catch(err => res.json({status: '400', message: 'Review not found'}));
    }
 
    addNewProduct(req, res) {
        const{title, description, price, available} = req.body;
        models.Product.create({
                title,
                description,
                price,
                available,
                createdAt: new Date(),
                updatedAt: new Date()
        })
        .then(newProduct => res.json(newProduct))
        .catch(err => res.json({status: '400', message: 'Error while creating Product'})); 
    }
}

module.exports = ProductsRestApi;