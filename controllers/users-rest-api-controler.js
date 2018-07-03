const models = require('../models');

class UsersRestApi {
    constructor() {
        this.getAllUsers = this.getAllUsers.bind(this);
    }

    getAllUsers(req, res) {
        models.User.findAll()
        .then(users => res.json(users));
    }
}

module.exports = UsersRestApi;