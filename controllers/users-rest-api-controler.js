const users = require('../models/users-model');

class UsersRestApi {
    static getAllUsers(req, res) {
        res.json(users);
    }
}

module.exports = UsersRestApi;