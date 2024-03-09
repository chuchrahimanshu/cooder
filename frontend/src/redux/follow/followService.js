// Import Section
import axios from "axios";

// API URL Declarations
const API_URL = process.env.REACT_APP_BACKEND_URL;
const USER_URL = API_URL + "users";
const FOLLOW_URL = "follows";

// API Calls Section
const updateFollowRelation = async (paramsData) => {
  const response = await axios.get(
    `${USER_URL}/${paramsData.userid}/${FOLLOW_URL}/relation/${paramsData.followid}`
  );
  return response.data;
};

const getFollowers = async (paramsData) => {
  const response = await axios.get(
    `${USER_URL}/${paramsData}/${FOLLOW_URL}/followers`
  );
  return response.data;
};

const getFollowing = async (paramsData) => {
  const response = await axios.get(
    `${USER_URL}/${paramsData}/${FOLLOW_URL}/following`
  );
  return response.data;
};

const userFollowDetails = async (paramsData) => {
  const response = await axios.get(
    `${USER_URL}/${paramsData}/${FOLLOW_URL}/details`
  );
  return response.data;
};

// Export Section
const followService = {
  updateFollowRelation,
  getFollowers,
  getFollowing,
  userFollowDetails,
};
export default followService;
