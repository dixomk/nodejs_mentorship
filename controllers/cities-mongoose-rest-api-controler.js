const mongoose = require('mongoose');
const config = require('../config');
const City = require('../models/city-mongoose');
const _ = require('underscore');
const url = config.mongodb.url;

class CitiesApiController {
    constructor() {
        this.getAllCities = this.getAllCities.bind(this);
        this.getRandomCity = this.getRandomCity.bind(this);
        this.updateCity = this.updateCity.bind(this);
        this.delCity = this.delCity.bind(this);
        this.addNewCity = this.addNewCity.bind(this);
    }

    getAllCities(req, res) {
        mongoose.connect(url);
        City.find().exec()
            .then(result => res.json(result))
            .catch(err => console.log(err));
    }

    getRandomCity(req, res) {
        mongoose.connect(url);
        City.find().exec()
            .then(result => {
                if(result.length) {
                    res.status('200')
                        .json(result[_.random(0, result.length-1)]);
                }else {
                    res.status('200')
                        .json({});
                }
                mongoose.disconnect();
            })
            .catch(err => console.log(err));
    }

    updateCity(req, res) {
        const cityId = req.params.id;
        const{name, capital, country, location} = req.body;
        mongoose.connect(url);

        City.findById(cityId, (err, result) => {
            if(err) {
                console.log(err);
                res.status('500')
                    .json({message: 'Error while finding City'});
            }else {
                let newValues = {name, capital, country, location};
                _.keys(newValues).forEach(field => {
                    if(newValues[field]) result[field] = newValues[field];
                });
                result.save(err => {
                    if(err) {
                        res.status('500')
                            .json({status: '500', message: 'Error while updating City'})
                    }else {
                        res.status('200')
                            .json(result);
                    }
                    mongoose.disconnect();
                });
            }
            
        });
    }

    delCity(req, res) {
        const cityId = req.params.id;
        mongoose.connect(url);

        City.deleteOne({_id: cityId}, (err) => {
            if(err) {
                console.log(err);
                res.status('500')
                    .json({message: 'Error while deleting City'});
            }else {
                res.status('200').end();
            }
            mongoose.disconnect();
        });
    }

    addNewCity(req, res) {
        const{name, country, capital, location} = req.body;
        mongoose.connect(url);

        const city = new City({
            name,
            country,
            capital,
            location
        });
        city.save(err => {
            if(err) {
                res.status('500')
                    .json({status: '500', message: 'Error while creating new City'})
            }else {
                res.status('200')
                    .json({
                        name,
                        country,
                        capital,
                        location
                    });
            }
            mongoose.disconnect();
        });
       
    }

    errorhandler(msg) {
        return (err, result) => {
            if(err) console.log(msg, err);
        }
    }
}

module.exports = CitiesApiController;