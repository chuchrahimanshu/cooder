import React, { useEffect } from "react";
import SignOut from "../../components/auth/SignOut";
import { RESET, RESET_PARAMETERS } from "../../redux/auth/auth.slice";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(RESET);
    dispatch(RESET_PARAMETERS);
  }, [dispatch]);

  return (
    <div>
      Home Page
      <SignOut />
    </div>
  );
};

export default Home;
