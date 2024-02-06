import React from "react";
import { Banner } from "../../components/auth/Banner";
import { BANNER_TEXT_AUTHENTICATE } from "../../constants";

const Authenticate = () => {
  return (
    <div>
      <Banner message={BANNER_TEXT_AUTHENTICATE} />
    </div>
  );
};

export { Authenticate };
