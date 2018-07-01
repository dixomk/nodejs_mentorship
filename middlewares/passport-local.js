const passport    = require('passport');
const LocalStrategy = require("passport-local").Strategy;

const users = require('../models/users-model');

passport.use(new LocalStrategy({
        usernameField: 'name',
        passwordField: 'password'
    },
    function (username, password, cb) {
        let user = null;
        console.log('verify');
        user = users.filter(user => user.username == username && user.password == password).length == 1 && {username, password};
        if(!user) return cb(null, false);
        
        return cb({user});

    }
));

module.exports = passport;