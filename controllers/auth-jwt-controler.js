const jwt = require('jsonwebtoken');
const users = require('../models/users-model');

class AuthJWT {
    constructor() {
        this.login = this.login.bind(this);
    }

    login(req, res, next) {
        res.status('200').send(req.body);
    }
}

module.exports = AuthJWT;