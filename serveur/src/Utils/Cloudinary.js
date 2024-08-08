const cloudinary = require('cloudinary').v2;
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});
async function uploadPDF(pdfBuffer,fileName) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: 'raw', folder: 'pdfs',public_id: fileName, format: 'pdf'  },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    ).end(pdfBuffer);
  });
}
module.exports = {cloudinary,uploadPDF};