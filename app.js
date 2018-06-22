const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');

// middlewares
const cookieParser = require('./middlewares/cookie-parser')({});
const queryStringParser = require('./middlewares/query-string-parser')();
const loginRequired = require('./middlewares/login-required');
const passportLocal = require('./middlewares/passport-local');

// routers
const productsRouter = require('./routes/products-router');
const usersRouter = require('./routes/users-router');
const authJWTRouter = require('./routes/auth-jwt-router');

const app = express();

// set middlewares
app.use(bodyParser.json());
app.use(cookieParser);
app.use(queryStringParser);
// app.use(passportLocal.init());
// set rest api routers with jwt local token
app.use('/api/products', loginRequired, productsRouter);
app.use('/api/users', loginRequired, usersRouter);

// set rest api routers with passport jwt local token
// app.use('/api/products', passportLocal.auth(), productsRouter);
// app.use('/api/users', passportLocal.auth(), usersRouter);

app.use('/auth/jwt', authJWTRouter);


// set errors handler
app.use((err, req, res, next) => {
    console.log('error:', err);
    res.json({});
});

module.exports = app;