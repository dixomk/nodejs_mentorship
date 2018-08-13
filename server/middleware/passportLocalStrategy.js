import passport from 'passport';
import LocalStrategy from 'passport-local';
import BearerStrategy from 'passport-http-bearer';
import jsonwebtoken from 'jsonwebtoken';
import { User } from '../models';


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
    }, (username, password, cb) => {
        User.findOne({ email : username}, (err, user) => {
            if(err) cb(err);
            if (!user) { return cb(null, false); }
            if (user.password != password) { return cb(null, false); }
            return cb(null, user);
        });
}));

passport.use(new BearerStrategy(
    function (token, done) {
        let result = jsonwebtoken.decode(token);

        if (!result) {
            done(null, false);
        } else {
            done(null, result, { scope: 'all' })
        }

    }
));

export default passport;