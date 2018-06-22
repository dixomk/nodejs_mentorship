const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const config = require('./config');
const expressSession = require('express-session')(config.session);

// middlewares
const cookieParser = require('./middlewares/cookie-parser')({});
const queryStringParser = require('./middlewares/query-string-parser')();
const loginRequired = require('./middlewares/login-required');
require('./middlewares/passport-local');

// routers
const productsRouter = require('./routes/products-router');
const usersRouter = require('./routes/users-router');
const authJWTRouter = require('./routes/auth-jwt-router');
const authPassportJWTRouter = require('./routes/auth-passport-jwt-router');
const app = express();

// set middlewares
app.use(bodyParser.json());
app.use(cookieParser);
app.use(queryStringParser);

// set rest api routers with jwt local token
//app.use('/api/products', loginRequired, productsRouter);
//app.use('/api/users', loginRequired, usersRouter);
app.use('/auth/passportjwt', authPassportJWTRouter);
// set rest api routers with passport jwt local token
app.use('/api/products', passport.authenticate('jwt', {session: false}), productsRouter);
app.use('/api/users', passport.authenticate('jwt', {session: false}), usersRouter);

// app.use('/auth/jwt', authJWTRouter);


// set errors handler
app.use((err, req, res, next) => {
    console.log('error:', err);
    res.json({});
});

module.exports = app;