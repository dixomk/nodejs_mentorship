const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const dbConfig    = require('../config').db.pgsql;
const db        = {};

const sequelize = new Sequelize(dbConfig);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js' && file !== 'index.js');
  })
  .forEach(file => {
    let model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
