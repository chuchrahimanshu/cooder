// Import Section
import axios from "axios";

// API URL Declarations
const API_URL = process.env.REACT_APP_BACKEND_URL;
const USER_URL = API_URL + "users";

// API Calls Section
const getAllUsers = async () => {
  const response = await axios.get(USER_URL + `/`);
  return response.data;
};

// Export Section
const userService = {
  getAllUsers,
};
export default userService;
