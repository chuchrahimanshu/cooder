// Import Section
import React from "react";
import { useSelector } from "react-redux";

// JSX Component Function
const ComingSoon = () => {
  // Hooks Configuration
  const { theme } = useSelector((state) => state.global);

  return (
    <section className={`coming-soon__text-container ${theme}`}>
      <p className="coming-soon__text">
        ⭐️ Exciting Developments Await! 🚀 Stay Tuned. 🎉
      </p>
    </section>
  );
};

// Export Section
export { ComingSoon };
