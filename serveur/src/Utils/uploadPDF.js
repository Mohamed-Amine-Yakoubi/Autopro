
require("dotenv").config();
const cloudinary = require('cloudinary').v2;




 
async function uploadPDF(pdfBuffer, fileName) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: 'raw', folder: 'pdfs', public_id: fileName, format: 'pdf' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    ).end(pdfBuffer);
  });
}
 
module.exports = uploadPDF;