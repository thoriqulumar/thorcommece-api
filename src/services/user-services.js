const { nanoid } = require('nanoid');

const User = require('../models/user');
const Profile = require('../models/profile');

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const id = `user-${nanoid()}`;
    // check input
    if (!username || !email || !password || !role) {
      return res.status(401).send({ message: 'missing required fields' });
    }

    // check available user
    const checkExistingUser = await User.findOne({ where: { email } });

    if (checkExistingUser) {
      return res.status(401).send({ message: 'email already been used' });
    }
    const user = await User.create({
      id,
      username,
      email,
      password,
      role,
    });

    const profileId = `profile-${nanoid()}`;
    if (role === 'user') {
      await Profile.create({
        id: profileId,
        user_id: user.id,
        email,
      });
    }

    return res.status(201).send({
      message: 'user succesfully created',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).send({
      message: 'internal server problem',
    });
  }
};

module.exports = {
  registerUser,
};
