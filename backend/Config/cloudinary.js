const cloudinary = require("cloudinary").v2;

const cloudnairyconnect = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        console.log("CD connected");
    } catch (error) {
        console.log("error connecting CD" + error);
    }
};

const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto"
        });
        return result.secure_url;
    } catch (error) {
        console.log("Cloudinary upload error:", error);
        throw error;
    }
};

module.exports = { cloudnairyconnect, cloudinary,uploadToCloudinary };