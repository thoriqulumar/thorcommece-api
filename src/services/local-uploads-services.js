// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
const path = require('path');

const localUploadSerivce = (dirPath) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${dirPath}`);
    },
    filename: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        const ext = path.extname(file.originalname);
        const fileName = `${dirPath}-${Date.now()}${ext}`;
        cb(null, fileName);
      } else {
        cb(new multer.MulterError('Only image files are allowed!'), false);
      }
    },
  });
  return multer({
    storage,

  });
};

module.exports = localUploadSerivce;
