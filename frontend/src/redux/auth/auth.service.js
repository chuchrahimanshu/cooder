// Import Section
import axios from "axios";

// API URL Declarations
const API_URL = process.env.REACT_APP_BACKEND_URL;
const AUTH_URL = API_URL + "auth";

// API Calls Section
const checkUserSignedIn = async () => {
  const response = await axios.get(AUTH_URL + "/");
  return response.data;
};

const verifyNewUser = async (apiData) => {
  const response = await axios.post(AUTH_URL + "/", apiData);
  return response.data;
};

const verifyUsername = async (paramData) => {
  const response = await axios.get(AUTH_URL + `/verify/${paramData}`);
  return response.data;
};

const userSignUp = async (apiData) => {
  const response = await axios.post(AUTH_URL + "/sign-up", apiData);
  return response.data;
};

const userSignIn = async (apiData) => {
  const response = await axios.post(AUTH_URL + "/sign-in", apiData);
  return response.data;
};

const userSignOut = async () => {
  const response = await axios.get(AUTH_URL + "/sign-out");
  return response.data;
};

const generateChangePasswordToken = async (paramData) => {
  const response = await axios.get(AUTH_URL + `/change-password/${paramData}`);
  return response.data;
};

const changePassword = async (apiData, paramData) => {
  const response = await axios.patch(
    AUTH_URL + `/change-password/${paramData}`,
    apiData
  );
  return response.data;
};

const generateTFAToken = async (paramData) => {
  const response = await axios.get(AUTH_URL + `/tfa/${paramData}`);
  return response.data;
};

const verifyTFAToken = async (apiData, paramData) => {
  const response = await axios.post(AUTH_URL + `/tfa/${paramData}`, apiData);
  return response.data;
};

const generateEmailToken = async (apiData) => {
  const response = await axios.get(AUTH_URL + `/email-verification`, apiData);
  return response.data;
};

const verifyEmail = async (apiData) => {
  const response = await axios.post(AUTH_URL + `/email-verification`, apiData);
  return response.data;
};

const authUsingGoogle = async (apiData) => {
  const response = await axios.post(AUTH_URL + `/google/callback`, apiData);
  return response.data;
};

const chooseUsername = async (apiData) => {
  const response = await axios.post(AUTH_URL + `/choose-username`, apiData);
  return response.data;
};

const getSingleUser = async (paramsData) => {
  const response = await axios.get(API_URL + `users/find/` + paramsData);
  return response.data;
};

// Export Section
const authService = {
  checkUserSignedIn,
  verifyNewUser,
  verifyUsername,
  userSignUp,
  userSignIn,
  userSignOut,
  generateChangePasswordToken,
  changePassword,
  generateTFAToken,
  verifyTFAToken,
  generateEmailToken,
  verifyEmail,
  authUsingGoogle,
  getSingleUser,
  chooseUsername,
};
export default authService;
