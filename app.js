import config from './config';
import {User, Product} from './models';

console.log(`App by name: ${config.name} was started !`);

const user = new User();
const product = new Product();