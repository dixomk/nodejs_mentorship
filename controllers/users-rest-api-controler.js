const users = require('../models/users-model');

class UsersRestApi {
    constructor() {
        this.getAllUsers = this.getAllUsers.bind(this);
    }

    getAllUsers(req, res) {
        res.json(users);
    }
}

module.exports = UsersRestApi;