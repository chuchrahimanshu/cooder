import { v2 as cloudinary } from "cloudinary";
import { APIError } from "./errorHandler.util.js";
import fs from "fs";

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

export { uploadMediaToCloudinary };
