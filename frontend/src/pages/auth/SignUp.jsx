import React from "react";
import { Banner } from "../../components/auth/Banner";
import { BANNER_TEXT_SIGN_UP } from "../../constants";

const SignUp = () => {
  return (
    <div>
      <Banner message={BANNER_TEXT_SIGN_UP} />
    </div>
  );
};

export { SignUp };
