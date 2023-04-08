// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');
const sequelize = require('../helper/model');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
});

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt();
  // eslint-disable-next-line no-param-reassign
  user.password = await bcrypt.hash(user.password, salt);
});

// eslint-disable-next-line func-names
User.prototype.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

module.exports = User;
