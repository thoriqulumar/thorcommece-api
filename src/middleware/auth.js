require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);

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
  const token = jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: '1h',
  });
  return token;
};

const generateRefreshToken = (id, role) => {
  const token = jwt.sign({ id, role }, process.env.REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: '1d',
  });
  return token;
};

const verifyRefreshToken = (refreshToken) => {
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
  return decoded;
};

module.exports = {
  authenticateUser,
  isAdmin,
  isUser,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
};
