const Profile = require('../models/profile');

const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const checkProfile = await Profile.findOne({ user_id: { userId } });

    if (!checkProfile) {
      return res.status(400).send({ status: 'failed', message: 'profile user not found' });
    }
    return res.status(200).send({ status: 'success', data: checkProfile });
  } catch (error) {
    return res.status(500).send({
      message: 'internal server problem',
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      firstName, lastName, email, address, postalCode,
    } = req.body;

    // check available user
    const checkExistingUser = await Profile.findOne({ user_id: { userId } });

    if (!checkExistingUser) {
      return res.status(404).send({ status: 'failed', message: 'profile user not found' });
    }

    await Profile.update({
      first_name: firstName,
      last_name: lastName,
      email,
      address,
      postal_code: postalCode,
    }, {
      where: {
        user_id: userId,
      },
    });

    return res.status(201).send({ status: 'success', message: 'profile user succesfully updated' });
  } catch (error) {
    return res.status(500).send({
      message: 'internal server problem',
    });
  }
};

const uploadProfileImage = async (req, res) => {
  try {
    const { userId } = req.params;
    const localPath = req.file.path;
    const path = localPath.split('\\');

    const imagePath = `/uploads/profile/${path[2]}`;
    await Profile.update({
      img_profile: imagePath,
    }, {
      where: {
        user_id: userId,
      },
    });
    return res.status(201).send({ status: 'success', message: 'image profile user succesfully uploaded' });
  } catch (error) {
    return res.status(500).send({
      message: 'internal server problem',
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadProfileImage,
};
