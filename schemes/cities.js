const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citiesSchema = new Schema({
    name: {type: String, default: 'NoName'},
    country: String,
    capital: {type: Boolean, default: false},
    location: {
        lat: Number,
        long: Number
    },
    lastModifiedDate: Date
});

citiesSchema.pre('save', function(next) {
    this.lastModifiedDate = new Date();
    next();
});

module.exports = citiesSchema;