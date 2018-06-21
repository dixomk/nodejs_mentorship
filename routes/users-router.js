const express = require('express');

const UsersRestApiController = require('../controllers/users-rest-api-controler');

const usersRestApiController = new UsersRestApiController();
const{getAllUsers} = usersRestApiController;
const usersRouter = express.Router();

usersRouter
    .get('/', getAllUsers);
    
module.exports = usersRouter;