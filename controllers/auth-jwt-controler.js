const jwt = require('jsonwebtoken');
const models  = require('../models');
const config = require('../config');

class AuthJWT {
    constructor() {
        this.login = this.login.bind(this);
    }

    login(req, res) {
        const{username, password} = req.body;
        const{jwtSecret, expiresIn} = config.jwt;
        models.User.findOne({
            where: {
                username: username,
                password: password
            }
        })
        .then(user => {
            if(user){
                return res.status('200')
                .json({
                    "code": "200",
                    "message": "OK",
                    "data": {
                        "user": {
                            "email": user.email,
                            "username": user.username
                        },
                        "token": jwt.sign({name: user.username}, jwtSecret, {expiresIn} )
                    }
                })
            }

            res.status('404')
                .json({
                    "code": "404",
                    "message": "User Not Found",
                    "data": {},
                    "token": "null"
                });
        })
        .catch(err => {
            console.log('Error while authorization', err);
            res.status('404')
                .json({
                    "code": "404",
                    "message": "Not Found",
                    "data": {},
                    "token": "null"
                });
        });
    }
}

module.exports = AuthJWT;