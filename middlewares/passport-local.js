const passport    = require('passport');
const LocalStrategy = require("passport-local").Strategy;;

const config = require('../config');
const users = require('../models/users-model');

const{jwtSecret, jwtSession} = config.jwt;


passport.use(new LocalStrategy({
        usernameField: 'name',
        passwordField: 'password'
    },
    function (username, password, cb) {
        let user = null;
        user = users.filter(user => user.username == username && user.password == password).length == 1 && {username, password};
        if(!user) return cb(null, false);
        
        return cb({username});

    }
));

module.exports = {
    init() {
        return passport.initialize();
    },
    auth(req, res ,next) {
        passport.authenticate('local',
            function(err, user, info) {
                return err 
                    ? next(err)
                    : user
                        ? req.logIn(user, function(err) {
                            return err
                                ? next(err)
                                : next();
                            })
                        : next();
            }
        )(req, res, next);
    }
};