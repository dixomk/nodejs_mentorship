import mongoose from 'mongoose';
import faker from 'faker';
import config from '../config/config.json';
import { User, Product, City } from '../models';

const db = mongoose.connect(config.db);
const count = 5;

generateUserData(count);
generateProductData(count);
generateCityData(count);


function generateUserData(count) {
    for(let i=0; i<=count; i++) {
        User.create({
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        },(err, user) => {
            if (err) {
                console.log('Err generateUserData ', err);
            }
            console.log('Successfully created users!!!');
        });
    }
};

function generateProductData(count) {
    for(let i=0; i<=count; i++) {
        Product.create({
            name: faker.commerce.productName(),
            price: faker.commerce.price()
        },(err, product) => {
            if (err) {
                console.log('Err generateProductData ', err);
            }
            console.log('Successfully created Product!!!');
        });
    }
};

function generateCityData(count) {
    for(let i=0; i<=count; i++) {
        City.create({
            name: faker.address.city(),
            country: faker.address.country(),
            capital: false,
            location: {
                lat: faker.address.latitude(),
                long:faker.address.longitude()
            },
        },(err, city) => {
            if (err) {
                console.log('Err generateCityData ', err);
            }
            console.log('Successfully created City!!!');
        });
    }
};