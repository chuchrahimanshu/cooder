import React, { useEffect } from "react";
import { FollowDisplay } from "../follow/FollowDisplay";
import { getUserDetails } from "../../redux/auth/auth.slice";
import { useDispatch, useSelector } from "react-redux";

const HomeDisplay = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserDetails(user?._id));
  }, [dispatch]);

  return (
    <div className="home__display">
      <FollowDisplay />
    </div>
  );
};

export { HomeDisplay };
