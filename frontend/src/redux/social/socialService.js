// Import Section
import axios from "axios";

// API URL Declarations
const API_URL = process.env.REACT_APP_BACKEND_URL;
const USER_URL = API_URL + "users";
const POST_URL = "posts";

// API Calls Section
const getAllFollowingPosts = async (paramsData) => {
  const response = await axios.get(
    `${USER_URL}/${paramsData}/${POST_URL}/following`
  );
  return response.data;
};

// Export Section
const socialService = {
  getAllFollowingPosts,
};
export default socialService;
