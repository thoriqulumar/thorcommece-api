// eslint-disable-next-line import/no-extraneous-dependencies
const { DataTypes } = require('sequelize');
const sequelize = require('../helper/db');

const Brands = sequelize.define(
  'Category',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'brands',
  },
);

module.exports = Brands;
