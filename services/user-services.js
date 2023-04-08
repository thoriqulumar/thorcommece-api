const { nanoid } = require('nanoid');
const { generateToken } = require('../middleware/auth');
const User = require('../models/user');

const registerUser = async (req, res) => {
  try {
    const {
      name, email, password, role,
    } = req.body;

    const id = nanoid(16);
    // check input
    if (!name || !email || !password || !role) {
      return res.status(401).send({ message: 'missing required fields' });
    }

    // check available user
    const checkExistingUser = await User.findOne({ where: { email } });

    if (checkExistingUser) {
      return res.status(401).send({ message: 'email already been used' });
    }
    const user = await User.create({
      id, name, email, password, role,
    });

    if (user) {
      return res.status(201).send({ message: 'user succesfully created' });
    }
    return res.status(500).send({ message: 'failed to create user' });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const {
      email, password,
    } = req.body;

    // check input
    if (!email || !password) {
      return res.status(401).send({ message: 'missing required fields' });
    }

    // check user
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).send({ message: 'user not found' });
    }

    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      return res.status(401).send('Invalid email or password');
    }
    const token = generateToken(user);
    return res.status(200).header('auth-token', token).send({ token });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const logoutUser = async (req, res) => res.status(200).send({ message: 'you are authenticate' });

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};