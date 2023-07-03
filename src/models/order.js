const { DataTypes } = require('sequelize');
const sequelize = require('../helper/db');

const Order = sequelize.define(
  'Order',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    transaction_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    item_order: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'orders',
  }
);

module.exports = Order;
