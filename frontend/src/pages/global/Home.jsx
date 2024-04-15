// Import Section
import React, { useEffect, useState } from "react";
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
import { UpdatePost } from "../../components/social/post/UpdatePost";

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

  // State Handling Section
  const [showUpdatePost, setShowUpdatePost] = useState(false);

  // JSX Component Return Section
  return (
    <section className="home-page__container">
      <div className="home-page">
        <CreatePost />
        <Posts setShowUpdatePost={setShowUpdatePost} />
        {showUpdatePost !== false && (
          <UpdatePost
            post={showUpdatePost}
            setShowUpdatePost={setShowUpdatePost}
          />
        )}
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
