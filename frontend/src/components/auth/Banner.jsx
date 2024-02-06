import React from "react";

const Banner = ({ message }) => {
  return (
    <div className="auth-banner">
      <p className="auth-banner__text">{message}</p>
    </div>
  );
};

export { Banner };
