import { Product } from '../../models';

export const getProducts = (req, res, next) => {
    Product.find({}, (err, product) => {
        if(err) return next(err);

        res.status(200).json(product);
    });
};

export const getProductById = (req, res, next) => {
    const productId = req.params.id;
    Product.findById(productId, (err, product) => {
        if(err) return next(err);
        res.status(200).json(product);
    });
};

export const removeProduct = (req, res, next) => {
    const productId = req.params.id;
    User.findById(productId).remove((err, user) => {
        if(err) return next(err);
        res.status(200).json(user);
    });
};
