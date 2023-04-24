require('dotenv').config();
const jwt = require('jsonwebtoken');
const Token = require('../models/accessToken');

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);

    const existedToken = await Token.findOne({ where: { token } });
    if (!existedToken) {
      res.status(401).send({ message: 'Unauthorized' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Unautenticate' });
  }
};

const isRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    res.status(403).send({ message: 'Unauthorize' });
  } else {
    next();
  }
};

const isAdmin = isRole('admin');
const isUser = isRole('user');

const generateAccessToken = (id, role) => {
  const token = jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '1h' });
  return token;
};

const generateRefreshToken = (id, role) => {
  const token = jwt.sign({ id, role }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '1d' });
  return token;
};

module.exports = {
  authenticateUser,
  isAdmin,
  isUser,
  generateAccessToken,
  generateRefreshToken,
};
