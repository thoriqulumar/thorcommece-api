// eslint-disable-next-line import/no-extraneous-dependencies
const { DataTypes } = require('sequelize');
const sequelize = require('../helper/model');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'category',
});

module.exports = Category;
