const config = require('../config');
const mongoClient = require('mongodb');
const{mongodb:{url}} = config;

const mongoDB = (req, res, next) => {
    mongoClient.connect(url, (err, client) => {
        if(err) {
            console.log('Error while connecting to MongoDB:', err);
            return next();
        }
        req.mdb = client;
        next();
    });
};

module.exports = mongoDB;