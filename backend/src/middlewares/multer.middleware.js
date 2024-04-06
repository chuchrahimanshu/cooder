/*
  Middleware Usecases:

    1. Using, multer for media files handling.
    2. Upload the media on local folder - public/uploads.
    3. Creates a storage object which create the file on diskStorage

    **This middleware is used when we are dealing with media files.

  This file contains 3 sections:

    1. Import Section
    2. Storage Object - Media Upload
    3. Export Section
*/

import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });
export { upload };
