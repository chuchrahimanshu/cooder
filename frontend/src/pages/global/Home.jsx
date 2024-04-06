// Import Section
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RESET, checkUserSignedIn } from "../../redux/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { CreatePost, HomeDisplay } from "../../components";
import { Posts } from "../../components/social/post/Posts";

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
    // if (user) {
    //   dispatch(getUserDetails(user?._id));
    // }
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
      <HomeDisplay />
    </section>
  );
};

// Export Section
export { Home };
