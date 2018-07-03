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
        this.insertManyCities = this.insertManyCities.bind(this);
    }

    getAllCities(req, res) {
         res.end();
    }

    getRandomCity(req, res) {
        const db = req.mdb.db('hw_seven');
        const cCities = db.collection('cities');
        cCities.find().toArray()
            .then(cities => {
                let randomCity = (cities.length) 
                    ? cities[_.random(0, cities.length-1)]
                    : {};
                res.status('200')
                    .json(randomCity);
            })
            .catch(err => {
                console.log(err);
                res.status('500')
                    .json({code: 500, message: 'Error while reading from DB'});
            });
        req.mdb.close();
    }

    insertManyCities(req, res) {
        const db = req.mdb.db('hw_seven');
        const cCities = db.collection('cities');
        cCities.insertMany(mockData, this.errorhandler('Error while inserting many cities'));
        req.mdb.close();
        res.end();
    }

    updateCity(req, res) {
        const cityId = req.params.id;
        const{name, capital, country, location} = req.body;
        mongoose.connect(url);

        City.findByIdAndUpdate(cityId, {name, capital, country, location}, {upsert: true, new: true}, (err, result) => {
            if(err) console.log(err);
            res.json(result);
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
