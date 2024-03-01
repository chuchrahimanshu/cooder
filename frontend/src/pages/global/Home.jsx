// Import Section
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RESET,
  RESET_PARAMETERS,
  checkUserSignedIn,
} from "../../redux/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { CreatePost } from "../../components";

const Home = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
    dispatch(RESET());
    dispatch(RESET_PARAMETERS());
    dispatch(checkUserSignedIn());
  }, [user, dispatch, navigate]);

  // JSX Component Return Section
  return (
    <div className="home-page">
      <CreatePost />
    </div>
  );
};

// Export Section
export { Home };
