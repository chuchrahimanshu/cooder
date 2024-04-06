/*
    This is a common export file, all the middlewares are exported using this file.
*/

export { verifyJWT } from "./auth.middleware.js";
export { upload } from "./multer.middleware.js";
export { verifyUser } from "./user.middleware.js";
export { getUserAgent } from "./userAgent.middleware.js";
