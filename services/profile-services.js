const Profile = require('../models/profile');

const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const checkProfile = await Profile.findOne({ user_id: { userId } });

    if (!checkProfile) {
      return res.status(401).send({ message: 'profile user not found' });
    }
    return res.status(201).send({ data: checkProfile });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      name, email, address, imgProfile, postalCode,
    } = req.body;

    // check available user
    const checkExistingUser = await Profile.findOne({ user_id: { userId } });

    if (!checkExistingUser) {
      return res.status(401).send({ message: 'profile user not found' });
    }

    const profile = await Profile.update({
      userId, name, email, address, imgProfile, postalCode,
    }, {
      where: {
        user_id: userId,
      },
    });

    if (profile) {
      return res.status(201).send({ message: 'profile user succesfully updated' });
    }
    return res.status(500).send({ message: 'failed to update profile user' });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
