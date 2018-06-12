const express = require('express');
const bodyParser = require('body-parser');

// middlewares
const cookieParser = require('./middlewares/cookie-parser')({});

// routers
const productsRouter = require('./routes/products-router');
const usersRouter = require('./routes/users-router');

const app = express();

// set middlewares
app.use(bodyParser.json());
app.use(cookieParser);

// set routers
app.use('api/products', productsRouter);
app.use('api/users', usersRouter);

module.exports = app;