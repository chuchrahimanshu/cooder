// Import Section
import axios from "axios";

// API URL Declarations
const API_URL = process.env.REACT_APP_BACKEND_URL;
const USER_URL = API_URL + "users";
const FOLLOW_URL = "follows";

// API Calls Section
const getFollowRequests = async (paramsData) => {
  const response = await axios.get(`${USER_URL}/${paramsData}/${FOLLOW_URL}/`);
  return response.data;
};

const pushFollowRequest = async (paramsData) => {
  const response = await axios.get(
    `${USER_URL}/${paramsData.userid}/${FOLLOW_URL}/${paramsData.followid}/request`
  );
  return response.data;
};

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

const deleteFollower = async (paramsData) => {
  const response = await axios.delete(
    `${USER_URL}/${paramsData.userid}/${FOLLOW_URL}/${paramsData.followid}/delete/follower`
  );
  return response.data;
};

const deleteFollowing = async (paramsData) => {
  const response = await axios.delete(
    `${USER_URL}/${paramsData.userid}/${FOLLOW_URL}/${paramsData.followid}/delete/following`
  );
  return response.data;
};

// Export Section
const followService = {
  getFollowRequests,
  updateFollowRelation,
  getFollowers,
  getFollowing,
  userFollowDetails,
  deleteFollower,
  deleteFollowing,
  pushFollowRequest,
};
export default followService;
