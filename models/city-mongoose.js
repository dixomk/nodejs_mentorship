const mongoose = require("mongoose");
const citySchema = require('../schemes/cities')
const City = mongoose.model('City', citySchema);
module.exports = City;