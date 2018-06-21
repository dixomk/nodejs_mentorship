const express = require('express');
const AuthController = require('../controllers/auth-jwt-controler');

const authController = new AuthController();
const{login} = authController;

const authJWTRouter = express.Router();

authJWTRouter
    .post('/', login);
    
module.exports = authJWTRouter;