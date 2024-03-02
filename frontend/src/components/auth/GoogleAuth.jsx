import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { authUsingGoogle } from "../../redux/auth/auth.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleAuth = async (credentialResponse) => {
    const apiData = {
      credential: credentialResponse,
    };
    const result = await dispatch(authUsingGoogle(apiData));
    if (result.meta.requestStatus === "fulfilled") {
      if (result.payload.data.newUser === true) {
        navigate("/auth/choose-username", { state: { googleAuth: true } });
      } else {
        navigate("/");
      }
    }
  };
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          handleGoogleAuth(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export { GoogleAuth };
