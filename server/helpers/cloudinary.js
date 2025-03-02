// const cloudinary = require("cloudinary").v2;
// const multer = require("multer");

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = new multer.memoryStorage();

// async function ImageUploadUtil(file) {
//   const result = await cloudinary.uploader.upload(file, {
//     resource_type: "auto",
//   });
//   return result;
// }

// const upload = multer({ storage });
// module.exports = { upload, ImageUploadUtil };

// ===================================================================================
// helpers/cloudinary.js
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ImageUploadUtil = async (buffer) => {
  return new Promise((resolve, reject) => {
    // Use a Promise for async/await
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          reject(error); // Reject the Promise if there's an error
        } else {
          resolve(result); // Resolve the Promise with the result
        }
      }
    );

    uploadStream.end(buffer); // Important: End the stream with the buffer
  });
};

module.exports = { ImageUploadUtil };
