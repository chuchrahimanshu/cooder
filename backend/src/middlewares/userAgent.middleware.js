/*
  Middleware Usecase - Set the useragent on req.useragent using "ua-parser-js"

    **This middleware is used while sign-up / sign-in the user.

  This file contains 3 sections:

    1. Import Section
    2. getUserAgent - Middleware Function
    3. Export Section
*/

import UAParser from "ua-parser-js";

const getUserAgent = (req, res, next) => {
  const parser = UAParser(req.headers["user-agent"]);
  const browserName = parser?.browser?.name;
  const browserVersion = parser?.browser?.version;
  const ua = parser.ua;
  const userAgent =
    browserName && browserVersion
      ? `${browserName}/${browserVersion}`
      : `${ua}`;

  req.userAgent = userAgent.toString();
  next();
};

export { getUserAgent };
