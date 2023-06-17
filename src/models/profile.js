// eslint-disable-next-line import/no-extraneous-dependencies
const { DataTypes } = require('sequelize');
const sequelize = require('../helper/model');

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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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
