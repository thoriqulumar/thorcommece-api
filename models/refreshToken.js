// eslint-disable-next-line import/no-extraneous-dependencies
const { DataTypes } = require('sequelize');
const sequelize = require('../helper/model');

const Refresh = sequelize.define('Refresh', {
  user_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  refresh_token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'refresh_token',
});

module.exports = Refresh;
