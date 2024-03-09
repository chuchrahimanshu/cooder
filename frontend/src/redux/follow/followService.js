// Import Section
import axios from "axios";

// API URL Declarations
const API_URL = process.env.REACT_APP_BACKEND_URL;
const USER_URL = API_URL + "users";
const FOLLOW_URL = API_URL + "follows";

// API Calls Section
const updateFollowRelation = async (paramsData) => {
  const response = await axios.get(
    USER_URL + paramsData.userid + FOLLOW_URL + paramsData.followid
  );
  return response.data;
};

// Export Section
const followService = {
  updateFollowRelation,
};
export default followService;
