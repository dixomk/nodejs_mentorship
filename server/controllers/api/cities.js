import { City } from '../../models';

export const getCities = (req, res, next) => {
    City.find({}, (err, cities) => {
        if(err) return next(err);

        res.status(200).json(cities);
    });
};

export const updateCity = (req, res, next) => {
    const cityId = req.params.id;
    const newData = {
        name: req.body.name,
        country: req.body.country,
        capital: false,
        location: {
            lat: req.body.lat,
            long: req.body.long,
        }
    };
    City.findOneAndUpdate({_id: cityId }, newData, {upsert:true}, (err, city) => {
        if(err) return next(err);
        res.status(200).json(newData);
    });
};

export const createCity = (req, res, next) => {
    const newData = {
        name: req.body.name,
        country: req.body.country,
        capital: false,
        location: {
            lat: req.body.lat,
            long: req.body.long,
        }
    };
    City.create(newData, (err, city) => {
        if(err) return next(err);
        res.status(200).json(city);
    });
};

export const removeCity = (req, res, next) => {
    const cityId = req.params.id;
    City.findById(cityId).remove((err, city) => {
        if(err) return next(err);
        res.status(200).json(city);
    });
};