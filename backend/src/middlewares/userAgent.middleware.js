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
