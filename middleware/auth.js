require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
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

const generateToken = (user) => {
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
  return token;
};

module.exports = {
  authenticateUser, isAdmin, isUser, generateToken,
};
