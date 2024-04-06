/*
  Middleware Usecases:

    1. Verify user by comparing the signed in user and user id comming from frontend.
    2. If, not matched then it initiates an error.

    **This middleware is used with every authenticated / protected route.

  This file contains 3 sections:

    1. Import Section
    2. verifyUser - Middleware Function
    3. Export Section
*/

import { APIError } from "../utils/index.js";

const verifyUser = async (req, res, next) => {
  const { userid } = req.params;

  if (req.user?._id.toString() !== userid.toString()) {
    return res.status(401).json(new APIError(401, "Unauthorized Access!"));
  }

  next();
};

export { verifyUser };
