// Import Section
import axios from "axios";

// API URL Declarations
const API_URL = process.env.REACT_APP_BACKEND_URL;
const AUTH_URL = API_URL + "auth";

// API Call Section
const verifyNewUser = async (apiData) => {
  const response = await axios.post(AUTH_URL + "/", apiData);
  return response.data;
};

// Export Section
const authService = { verifyNewUser };
export default authService;
