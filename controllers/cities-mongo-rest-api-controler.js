const _ = require('underscore');
const mockData = [{
        name: 'Brest',
        country: 'Belarus',
        capital: false,
        location: {
            lat: 52.097621,
            long: 23.734050
        }
    }, {
        name: 'Kyiv',
        country: 'Ukraine',
        capital: true,
        location: {
            lat: 34.65423,
            long: 43.734050
        }
    },{
        name: 'Madrid',
        country: 'Spain',
        capital: false,
        location: {
            lat: 25.097621,
            long: 32.734050
        }
    }];
class CitiesApiController {
    constructor() {
        this.getRandomCity = this.getRandomCity.bind(this);
        this.insertManyCities = this.insertManyCities.bind(this);
    }

    getAllCities(req, res) {
        console.log('>>>>> all cities');
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

    updateCity(req, res) {}
    delCity(req, res) {}
    addNewCity(req, res) {}

    errorhandler(msg) {
        return (err, result) => {
            if(err) console.log(msg, err);
        }
    }
}

module.exports = CitiesApiController;
