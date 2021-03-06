const express = require('express');

const CitiesRestApiController = require('../controllers/cities-mongoose-rest-api-controler');

const citiesRestApiController = new CitiesRestApiController();
const{getAllCities, updateCity, delCity, addNewCity, getRandomCity, insertManyCities} = citiesRestApiController;

const produtcsRouter = express.Router();

produtcsRouter
    .get('/', getAllCities)
    .get('/random', getRandomCity)
    .put('/:id', updateCity)
    .delete('/:id', delCity)
    .post('/', addNewCity);
    
module.exports = produtcsRouter;