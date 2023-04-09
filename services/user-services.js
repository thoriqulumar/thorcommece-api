const { nanoid } = require('nanoid');
const { generateAccessToken, generateRefreshToken } = require('../middleware/auth');
const User = require('../models/user');
const Profile = require('../models/profile');
const Refresh = require('../models/refreshToken');

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

    const profileId = nanoid(20);
    if (role === 'user') {
      await Profile.create({
        id: profileId, user_id: id, name, email,
      });
    }

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
    const token = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id, user.role);
    const userId = user.id;

    await Refresh.create({
      user_id: userId,
      refresh_token: refreshToken,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).send({ access_token: token });
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
