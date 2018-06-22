const passport    = require('passport');
const passportJWT = require("passport-jwt");
const jwt = require('jsonwebtoken');

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;

const users = require('../models/users-model');

passport.use(new LocalStrategy({
        usernameField: 'name',
        passwordField: 'password'
    },
    function (name, password, cb) {
        if(users.filter(user => user.name == name && user.password == password).length == 1){
            return cb(null, {token: jwt.sign({name}, 'secret')}, {message: 'Logged In Successfully'});
        }else {
            return cb(null, null, {message: 'Incorrect email or password.'});
        }
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'secret'
    },
    function (jwtPayload, cb) {

        //find the user in db if needed
        return jwt.verify(jwtPayload.token)
    }
));
