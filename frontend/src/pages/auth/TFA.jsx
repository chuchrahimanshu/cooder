import React from "react";
import { Banner } from "../../components/auth/Banner";
import { BANNER_TEXT_TFA } from "../../constants";

const TFA = () => {
  return (
    <div>
      <Banner message={BANNER_TEXT_TFA} />
    </div>
  );
};

export { TFA };
