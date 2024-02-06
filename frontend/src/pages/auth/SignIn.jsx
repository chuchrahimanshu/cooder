import React from "react";
import { Banner } from "../../components";
import { BANNER_TEXT_SIGN_IN } from "../../constants";

const SignIn = () => {
  return (
    <div>
      <Banner message={BANNER_TEXT_SIGN_IN} />
    </div>
  );
};

export { SignIn };
