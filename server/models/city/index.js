import mongoose, { Schema } from 'mongoose';

const citySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    capital: {
        type: Boolean,
        required: true
    },
    location: {
        type: Object,
        required: true
    },
});

export default mongoose.model('City', citySchema, 'cities');