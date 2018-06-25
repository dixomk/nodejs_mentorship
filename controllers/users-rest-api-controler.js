const users = require('../models/users-model');

class UsersRestApi {
    constructor() {
        this.getAllUsers = this.getAllUsers.bind(this);
        this.getByID = this.getByID.bind(this);
    }

    getAllUsers(req, res) {
        res.json(users);
    }

    getByID(req, res) {
        
    }
}

module.exports = UsersRestApi;