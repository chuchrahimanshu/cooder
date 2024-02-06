import React from "react";
import { Banner } from "../../components/auth/Banner";
import { BANNER_TEXT_CHANGE_PASSWORD } from "../../constants";

const ChangePassword = () => {
  return (
    <div>
      <Banner message={BANNER_TEXT_CHANGE_PASSWORD} />
    </div>
  );
};

export { ChangePassword };
