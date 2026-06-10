import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
