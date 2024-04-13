import React from "react";
import { useSelector } from "react-redux";

const ProfileComingSoon = () => {
  // Hooks Configuration
  const { theme } = useSelector((state) => state.global);

  return (
    <section className={`edit-profile__coming-soon ${theme}`}>
      <p className="coming-soon__text">
        ⭐️ Exciting Developments Await! 🚀 Stay Tuned. 🎉
      </p>
    </section>
  );
};

export default ProfileComingSoon;
