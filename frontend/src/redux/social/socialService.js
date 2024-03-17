// Import Section
import axios from "axios";

// API URL Declarations
const API_URL = process.env.REACT_APP_BACKEND_URL;
const USER_URL = API_URL + "users";
const POST_URL = "posts";
const COMMENT_URL = "comments";
const REPLY_URL = "replies";

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

const getPost = async (paramsData) => {
  const response = await axios.delete(
    `${USER_URL}/${paramsData.userid}/${POST_URL}/${paramsData.postid}/get`
  );
  return response.data;
};

const updatePost = async (paramsData, bodyData) => {
  const response = await axios.patch(
    `${USER_URL}/${paramsData.userid}/${POST_URL}/${paramsData.postid}/update`,
    bodyData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

const deletePost = async (paramsData) => {
  const response = await axios.delete(
    `${USER_URL}/${paramsData.userid}/${POST_URL}/${paramsData.postid}/delete`
  );
  return response.data;
};

const createComment = async (paramsData, bodyData) => {
  const response = await axios.post(
    `${USER_URL}/${paramsData.userid}/${POST_URL}/${paramsData.postid}/${COMMENT_URL}/`,
    bodyData
  );
  return response.data;
};

const getComment = async (paramsData) => {
  const response = await axios.get(
    `${USER_URL}/${paramsData.userid}/${POST_URL}/${paramsData.postid}/${COMMENT_URL}/${paramsData.commentid}`
  );
  return response.data;
};

const updateComment = async (paramsData, bodyData) => {
  const response = await axios.patch(
    `${USER_URL}/${paramsData.userid}/${POST_URL}/${paramsData.postid}/${COMMENT_URL}/${paramsData.commentid}`,
    bodyData
  );
  return response.data;
};

const deleteComment = async (paramsData) => {
  const response = await axios.delete(
    `${USER_URL}/${paramsData.userid}/${POST_URL}/${paramsData.postid}/${COMMENT_URL}/${paramsData.commentid}`
  );
  return response.data;
};

const createReply = async (paramsData, bodyData) => {
  const response = await axios.post(
    `${USER_URL}/${paramsData.userid}/${POST_URL}/${paramsData.postid}/${COMMENT_URL}/${paramsData.commentid}/${REPLY_URL}/`,
    bodyData
  );
  return response.data;
};

const getReply = async (paramsData) => {
  const response = await axios.get(
    `${USER_URL}/${paramsData.userid}/${POST_URL}/${paramsData.postid}/${COMMENT_URL}/${paramsData.commentid}/${REPLY_URL}/${paramsData.replyid}/get`
  );
  return response.data;
};

const updateReply = async (paramsData, bodyData) => {
  const response = await axios.patch(
    `${USER_URL}/${paramsData.userid}/${POST_URL}/${paramsData.postid}/${COMMENT_URL}/${paramsData.commentid}/${REPLY_URL}/${paramsData.replyid}/update`,
    bodyData
  );
  return response.data;
};

const deleteReply = async (paramsData) => {
  const response = await axios.delete(
    `${USER_URL}/${paramsData.userid}/${POST_URL}/${paramsData.postid}/${COMMENT_URL}/${paramsData.commentid}/${REPLY_URL}/${paramsData.replyid}/delete`
  );
  return response.data;
};

// Export Section
const socialService = {
  getAllFollowingPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  createComment,
  getComment,
  updateComment,
  deleteComment,
  createReply,
  getReply,
  updateReply,
  deleteReply,
};
export default socialService;
