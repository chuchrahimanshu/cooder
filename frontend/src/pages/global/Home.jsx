// Import Section
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RESET, checkUserSignedIn } from "../../redux/auth/auth.slice";

// Import Components
import {
  CreatePost,
  FollowRequests,
  HomeDisplay,
  Posts,
} from "../../components";

// JSX Component Function
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
    <section className="home-page__container">
      <div className="home-page">
        <CreatePost />
        <Posts />
      </div>
      <div className="home-page__display">
        <FollowRequests />
        <HomeDisplay />
      </div>
    </section>
  );
};

// Export Section
export { Home };
