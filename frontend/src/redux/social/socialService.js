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

const createPost = async (apiData) => {
  const response = await axios.post(
    `${USER_URL}/${apiData.paramsData}/${POST_URL}/`,
    apiData.bodyData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

// Export Section
const socialService = {
  getAllFollowingPosts,
  createPost,
};
export default socialService;
