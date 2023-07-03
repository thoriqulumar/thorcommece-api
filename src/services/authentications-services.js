const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require('../middleware/auth');
const User = require('../models/user');
const Token = require('../models/authentications');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check input
    if (!email || !password) {
      return res
        .status(400)
        .send({ status: 'failed', message: 'missing required fields' });
    }

    // check user
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .send({ status: 'failed', message: 'user not found' });
    }

    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      return res.status(400).send('Invalid email or password');
    }
    const token = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id, user.role);

    await Token.create({ token: refreshToken });

    return res.status(201).send({
      status: 'success',
      data: {
        accessToken: token,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).send({
      message: 'internal server problem',
      error,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const checkExistingToken = await Token.findOne({ token: { refreshToken } });

    if (!checkExistingToken) {
      return res.status(404).send('refresh token not found');
    }

    await Token.destroy({
      where: {
        token: refreshToken,
      },
    });

    return res.status(200).send({
      status: 'success',
      message: 'logged out successfully',
    });
  } catch (error) {
    return res.status(500).send({
      message: 'internal server problem',
    });
  }
};

const refreshAuthentication = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const checkExistingToken = await Token.findOne({
      where: { token: refreshToken },
    });

    if (!checkExistingToken) {
      return res
        .status(404)
        .send({ status: 'failed', message: 'refresh token not found' });
    }
    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
      return res
        .status(401)
        .send({ status: 'failed', message: 'refresh token expired' });
    }

    const token = generateAccessToken(decoded.id, decoded.role);
    return res.status(200).send({
      status: 'success',
      data: {
        accessToken: token,
      },
    });
  } catch (error) {
    return res.status(500).send({
      message: 'internal server problem',
    });
  }
};

module.exports = {
  loginUser,
  logoutUser,
  refreshAuthentication,
};
