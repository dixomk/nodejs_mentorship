const jwt = require('jsonwebtoken');
const users = require('../models/users-model');
const config = require('../config');

class AuthJWT {
    constructor() {
        this.login = this.login.bind(this);
    }

    login(req, res) {
        const{name, password} = req.body;
        const{jwtSecret, expiresIn} = config.jwt;
    
        users.filter(user => user.name == name && user.password == password).length == 1
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
            : res.status('404')
                .json({
                    "code": "404",
                    "message": "Not Found",
                    "data": {},
                    "token": "null"
                });
    }
}

module.exports = AuthJWT;