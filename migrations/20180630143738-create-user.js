
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
  "id": {
    "type": {
      "options": {}
    },
    "allowNull": false,
    "primaryKey": true,
    "autoIncrement": true
  },
  "username": {
    "type": {
      "options": {},
      "_length": 255
    }
  },
  "password": {
    "type": {
      "options": {},
      "_length": 255
    }
  },
  "email": {
    "type": {
      "options": {},
      "_length": 255
    }
  },
  "gender": {
    "type": {
      "options": {},
      "_length": 255
    }
  },
  "createdAt": {
    "type": {
      "options": {},
      "_length": ""
    },
    "allowNull": true
  },
  "updatedAt": {
    "type": {
      "options": {},
      "_length": ""
    },
    "allowNull": true
  }
});
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable(Users);
  }
};