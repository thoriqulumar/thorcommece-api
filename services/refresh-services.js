require('dotenv').config();
const jwt = require('jsonwebtoken');
const Refresh = require('../models/refreshToken');
const User = require('../models/user');
const { generateAccessToken } = require('../middleware/auth');

const refreshTokenService = async (req, res) => {
  try {
    const { cookie } = req.headers;
    const accessedRefreshToken = cookie.split('=')[1];
    if (!accessedRefreshToken) {
      return res.sendStatus(401);
    }
    const existingRefreshToken = await Refresh.findOne({
      where: {
        refresh_token: accessedRefreshToken,
      },
    });
    if (!existingRefreshToken) {
      return res.sendStatus(403);
    }
    const decoded = jwt.verify(accessedRefreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
    if (!decoded) {
      return res.sendStatus(403);
    }

    const user = await User.findOne({ where: { id: existingRefreshToken.user_id } });

    const newAccessToken = generateAccessToken(existingRefreshToken.user_id, user.role);
    return res.status(200).send({ access_token: newAccessToken });
  } catch (error) {
    return res.status(401).send({ message: 'Unautenticate' });
  }
};

module.exports = { refreshTokenService };
