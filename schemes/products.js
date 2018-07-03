const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {type:String, default: 'NoName'},
    description: String,
    available: {type: Boolean, default: false},
    price: {type: Number, default: 0.0},
    lastModifiedDate: Date
});

productSchema.pre('save', function(next) {
    this.lastModifiedDate = new Date();
    next();
});

productSchema.pre('update', function() {
    this.update({},{ $set: {lastModifiedDate: new Date()} });
});

module.exports = productSchema;