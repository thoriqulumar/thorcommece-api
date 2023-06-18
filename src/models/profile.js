// eslint-disable-next-line import/no-extraneous-dependencies
const { DataTypes } = require('sequelize');
const sequelize = require('../helper/db');

const Profile = sequelize.define(
  'Profile',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    img_profile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'detail_users',
  },
);

module.exports = Profile;
