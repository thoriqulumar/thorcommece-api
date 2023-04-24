const { Sequelize } = require('sequelize');
const Refresh = require('../models/refreshToken');
const Token = require('../models/accessToken');

const deleteToken = (token) => {
  token.destroy();
};

const checkTokenExpired = async () => {
  const expiredTokens = await Token.findAll({
    where: {
      expired_at: { [Sequelize.Op.lt]: new Date() },
    },
  });

  const expiredRefresh = await Refresh.findAll({
    where: {
      expired_at: { [Sequelize.Op.lt]: new Date() },
    },
  });

  expiredTokens.forEach(deleteToken);
  expiredRefresh.forEach(deleteToken);
};

module.exports = { checkTokenExpired };
