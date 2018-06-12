const express = require('express');

const usersRestApiController = require('../controllers/users-rest-api-controler');

const usersRouter = express.Router();

usersRouter
    .get('/', usersRestApiController.getAllUsers);
    
module.exports = usersRouter;