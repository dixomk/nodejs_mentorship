
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Products', {
  "id": {
    "type": {
      "options": {}
    },
    "allowNull": false,
    "primaryKey": true,
    "autoIncrement": true
  },
  "title": {
    "type": {
      "options": {},
      "_length": 255
    }
  },
  "description": {
    "type": {
      "options": {},
      "_length": ""
    }
  },
  "price": {
    "type": {
      "options": {
        "decimals": 2
      }
    }
  },
  "available": {
    "type": {}
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
    return queryInterface.dropTable(Products);
  }
};