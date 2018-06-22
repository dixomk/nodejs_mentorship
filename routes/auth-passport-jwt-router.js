const express = require('express');
const AuthPassportJWTController = require('../controllers/auth-passport-jwt-controler');

const authPassportJWTController = new AuthPassportJWTController();
const{login} = authPassportJWTController;

const authPassportJWTRouter = express.Router();

authPassportJWTRouter
    .post('/', login);
    
module.exports = authPassportJWTRouter;