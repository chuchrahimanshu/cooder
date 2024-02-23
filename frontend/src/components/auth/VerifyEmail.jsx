// Import Section
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { generateEmailToken } from "../../redux/auth/auth.slice";

const VerifyEmail = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Form Handling Section
  const handleEmailVerification = async () => {
    await dispatch(generateEmailToken());
    navigate("/auth/verify-email", { state: { email: user.email } });
  };

  return (
    <div className="auth-email" onClick={handleEmailVerification}>
      <p className="auth-email__text">📧 Please Verify your Email Address </p>
    </div>
  );
};

export { VerifyEmail };
