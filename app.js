const express = require('express');
const bodyParser = require('body-parser');

// middlewares
const cookieParser = require('./middlewares/cookie-parser')({});
const queryStringParser = require('./middlewares/query-string-parser')();

// routers
const productsRouter = require('./routes/products-router');
const usersRouter = require('./routes/users-router');
const authJWTRouter = require('./routes/auth-jwt-router');

const app = express();

// set middlewares
app.use(bodyParser.json());
app.use(cookieParser);
app.use(queryStringParser);

// set rest api routers
app.use('/auth/jwt', authJWTRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);

// set errors handler
app.use((err, req, res, next) => {
    console.log('error:', err);
    res.json({});
});

module.exports = app;