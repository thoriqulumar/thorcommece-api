const { DataTypes } = require('sequelize');
const sequelize = require('../helper/db');

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'cart',
});

module.exports = Cart;
