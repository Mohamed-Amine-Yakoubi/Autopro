const multer = require('multer');

// Multer storage setup
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Multer upload setup
const upload = multer({ storage: storage });

module.exports = upload;