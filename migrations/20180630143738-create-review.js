
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Reviews', {
  "id": {
    "type": {
      "options": {}
    },
    "allowNull": false,
    "primaryKey": true,
    "autoIncrement": true
  },
  "productId": {
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
  },
  "ProductId": {
    "type": {
      "options": {}
    },
    "allowNull": true,
    "references": {
      "model": "Products",
      "key": "id"
    },
    "onDelete": "SET NULL",
    "onUpdate": "CASCADE"
  }
});
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable(Reviews);
  }
};