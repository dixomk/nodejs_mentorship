const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

// middlewares
const cookieParser = require('./middlewares/cookie-parser')({});
const queryStringParser = require('./middlewares/query-string-parser')();
const loginRequired = require('./middlewares/login-required');

// routers
const productsRouter = require('./routes/products-router');
const usersRouter = require('./routes/users-router');
const authJWTRouter = require('./routes/auth-jwt-router');

const app = express();

// set middlewares
app.use(bodyParser.json());
app.use(cookieParser);
app.use(queryStringParser);

// set rest api routers with jwt local token
app.use('/api/products', productsRouter); // loginRequired,
app.use('/api/users', usersRouter); // loginRequired, 

app.use('/auth/jwt', authJWTRouter);

// set errors handler
app.use((err, req, res, next) => {
    console.log('error:', err);
    res.json({});
});



module.exports = app;