// Import Section
import axios from "axios";

// API URL Declarations
const API_URL = process.env.REACT_APP_BACKEND_URL;
const USER_URL = API_URL + "users";

// API Calls Section
const getAllUsers = async () => {
  const response = await axios.get(USER_URL + `/`, {
    withCredentials: true,
  });
  return response.data;
};

const updateUser = async ({ paramsData, bodyData }) => {
  const response = await axios.put(
    USER_URL + `/${paramsData}/update`,
    bodyData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// Export Section
const userService = {
  getAllUsers,
  updateUser,
};
export default userService;
