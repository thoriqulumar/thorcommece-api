// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
const path = require('path');

const localUploadSerivce = (dirPath) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${dirPath}`);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const fileName = `profile-${Date.now()}${ext}`;
      cb(null, fileName);
    },
  });
  return multer({ storage });
};

module.exports = localUploadSerivce;
