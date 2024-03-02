// Import Section
import React from "react";

const Banner = ({ message }) => {
  // JSX Componenet Return Section
  return (
    <div className="auth-banner">
      <p className="auth-banner__text">{message}</p>
    </div>
  );
};

// Export Section
export { Banner };
