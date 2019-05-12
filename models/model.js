const Sequelize = require('sequelize');
const db = require("../database/mysql.js");

const Repos = db.sequelize.define('repos', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  stars: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false
});

module.exports = Repos;