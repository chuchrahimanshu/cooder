// Import Section
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RESET, userSignOut } from "../../redux/auth/auth.slice.js";

const SignOut = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form Handling Section
  const handleSignOut = async () => {
    const result = await dispatch(userSignOut());

    if (result.meta.requestStatus === "fulfilled") {
      await dispatch(RESET());
      navigate("/auth/sign-in");
    }
  };

  // JSX Component Return Section
  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOut;
