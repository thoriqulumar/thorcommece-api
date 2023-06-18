// eslint-disable-next-line import/no-extraneous-dependencies
const { DataTypes } = require('sequelize');
const sequelize = require('../helper/db');

const Token = sequelize.define(
  'Token',
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'authentications',
  },
);
Token.removeAttribute('id');
module.exports = Token;
