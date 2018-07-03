const express = require('express');

const CitiesRestApiController = require('../controllers/cities-mongo-rest-api-controler.js');
const mongoClient = require('../middlewares/mongo-db');
const citiesRestApiController = new CitiesRestApiController();
const{getRandomCity, insertManyCities} = citiesRestApiController;

const produtcsRouter = express.Router();

produtcsRouter
    .get('/random', mongoClient, getRandomCity)
    .get('/insertmany', mongoClient, insertManyCities);
    
module.exports = produtcsRouter;