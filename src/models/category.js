// eslint-disable-next-line import/no-extraneous-dependencies
const { DataTypes } = require('sequelize');
const sequelize = require('../helper/db');

const Category = sequelize.define(
  'Category',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'category',
  },
);

module.exports = Category;
