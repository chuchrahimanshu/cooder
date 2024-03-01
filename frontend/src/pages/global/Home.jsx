// Import Section
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RESET, checkUserSignedIn } from "../../redux/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { CreatePost, Post } from "../../components";

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
    dispatch(checkUserSignedIn());
  }, [user, dispatch, navigate]);

  // JSX Component Return Section
  return (
    <div className="home-page">
      <CreatePost />
      <Post />
    </div>
  );
};

// Export Section
export { Home };
