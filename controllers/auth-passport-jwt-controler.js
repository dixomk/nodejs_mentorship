const jwt = require('jsonwebtoken');
const users = require('../models/users-model');
const config = require('../config');
const passport    = require('passport');

class AuthPassportJWT {
    constructor() {
        this.login = this.login.bind(this);
    }

    login(req, res) {
        const{name, password} = req.body;
        const{jwtSecret, expiresIn} = config.jwt;
    
        /*users.filter(user => user.name == name && user.password == password).length == 1
            ? res.status('200')
                .json({
                    "code": "200",
                    "message": "OK",
                    "data": {
                        "user": {
                            "email": "test@gmail.com",
                            "username": `${name}`
                        },
                        "token": jwt.sign({name}, jwtSecret, {expiresIn} )
                    }
                })
            : res.status('401')
                .json({
                    "code": "401",
                    "message": "Not Found",
                    "data": {},
                    "token": "null"
                });
*/
                passport.authenticate('local', {session: false}, (err, data, info) => {
                   
                    if (err || !user) {
                        return res.status(400).json({
                            message: info ? info.message : 'Login failed',
                            user   : user
                        });
                    }
            
                    req.login(user, {session: false}, (err) => {
                        if (err) {
                            res.send(err);
                        }
            
                        const token = jwt.sign(user, jwtSecret);
            
                        return res.json({token});
                    });
                })
                (req, res);
    }
}

module.exports = AuthPassportJWT;