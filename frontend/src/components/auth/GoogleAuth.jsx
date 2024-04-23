// Import Section
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { authUsingGoogle } from "../../redux/auth/auth.slice";

// JSX Component Function
const GoogleAuth = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Event Handling Section
  const handleGoogleAuth = async (credentialResponse) => {
    const apiData = {
      credential: credentialResponse,
    };
    const result = await dispatch(authUsingGoogle(apiData));
    if (result.meta.requestStatus === "fulfilled") {
      if (result.payload?.data?.newUser === true) {
        navigate("/auth/choose-username", { state: { googleAuth: true } });
      } else {
        navigate("/");
      }
    }
  };

  // JSX Component Return Section
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        handleGoogleAuth(credentialResponse);
      }}
      type="standard"
    />
  );
};

// Export Section
export { GoogleAuth };
