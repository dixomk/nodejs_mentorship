const jwt = require('jsonwebtoken');
const users = require('../models/users-model');
const config = require('../config');
const passport    = require('passport');

class AuthPassportJWT {
    constructor() {
        this.login = this.login.bind(this);
    }

    
}

module.exports = AuthPassportJWT;