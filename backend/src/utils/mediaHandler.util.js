/*
  Utility usecase - Takes path of local media files and upload it on Cloudinary.

  This Utility conatins 3 sections:

    1. Import Section
    2. Function to upload media on Cloudinary
    3. Export Section
*/

// Import Section
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { APIError } from "./errorHandler.util.js";

// Upload Media to Cloudinary
const uploadMediaToCloudinary = async (localFilePath, folderPath) => {
  try {
    if (!localFilePath || !folderPath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: folderPath,
      unique_filename: true,
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return new APIError(500, `Uploading Media to Cloudinary!`, error);
  }
};

const deleteMediaFromCloudinary = async (public_id, resource_type) => {
  try {
    if (!public_id) return null;

    const response = await cloudinary.uploader.destroy(public_id, {
      resource_type: resource_type,
    });
    return response;
  } catch (error) {
    return new APIError(500, `Deleting Media from Cloudinary!`, error);
  }
};

// Export Section
export { uploadMediaToCloudinary, deleteMediaFromCloudinary };
