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
    `${USER_URL}/${paramsData}/${POST_URL}/following`,
    {
      withCredentials: true,
    }
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
      withCredentials: true,
    }
  );
  return response.data;
};

const getPost = async (paramsData) => {
  const response = await axios.delete(
    `${USER_URL}/${paramsData.userid}/${POST_URL}/${paramsData.postid}/get`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const updatePost = async (apiData) => {
  const response = await axios.put(
    `${USER_URL}/${apiData.paramsData.userid}/${POST_URL}/${apiData.paramsData.postid}/update`,
    apiData.bodyData
  );
  return response.data;
};

const deletePost = async (paramsData) => {
  const response = await axios.delete(
    `${USER_URL}/${paramsData.userid}/${POST_URL}/${paramsData.postid}/delete`
  );
  return response.data;
};

const reactionOnPost = async (paramsData) => {
  const response = await axios.get(
    `${USER_URL}/${paramsData.userid}/${POST_URL}/${paramsData.postid}/reaction`
  );
  return response.data;
};

const quoteOnPost = async ({ paramsData, bodyData }) => {
  const response = await axios.post(
    `${USER_URL}/${paramsData.userid}/${POST_URL}/${paramsData.postid}/quote`,
    bodyData
  );
  return response.data;
};

const createRepost = async (paramsData) => {
  const response = await axios.get(
    `${USER_URL}/${paramsData.userid}/${POST_URL}/${paramsData.postid}/repost`
  );
  return response.data;
};

const createComment = async ({ paramsData, bodyData }) => {
  const response = await axios.post(
    `${USER_URL}/${paramsData.userid}/${POST_URL}/${paramsData.postid}/${COMMENT_URL}/`,
    bodyData
  );
  return response.data;
};

const getComment = async (paramsData) => {
  const response = await axios.get(
    `${USER_URL}/${paramsData.userid}/${POST_URL}/${paramsData.postid}/${COMMENT_URL}/${paramsData.commentid}/get`
  );
  return response.data;
};

const updateComment = async ({ paramsData, bodyData }) => {
  const response = await axios.patch(
    `${USER_URL}/${paramsData.userid}/${POST_URL}/${paramsData.postid}/${COMMENT_URL}/${paramsData.commentid}/update`,
    bodyData
  );
  return response.data;
};

const deleteComment = async (paramsData) => {
  const response = await axios.delete(
    `${USER_URL}/${paramsData.userid}/${POST_URL}/${paramsData.postid}/${COMMENT_URL}/${paramsData.commentid}/delete`
  );
  return response.data;
};

const reactionOnComment = async (paramsData) => {
  const response = await axios.get(
    `${USER_URL}/${paramsData.userid}/${POST_URL}/${paramsData.postid}/${COMMENT_URL}/${paramsData.commentid}/reaction`
  );
  return response.data;
};

const quoteOnComment = async ({ paramsData, bodyData }) => {
  const response = await axios.post(
    `${USER_URL}/${paramsData.userid}/${POST_URL}/${paramsData.postid}/${COMMENT_URL}/${paramsData.commentid}/quote`,
    bodyData
  );
  return response.data;
};

const createReply = async ({ paramsData, bodyData }) => {
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

const updateReply = async ({ paramsData, bodyData }) => {
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

const reactionOnReply = async (paramsData) => {
  const response = await axios.get(
    `${USER_URL}/${paramsData.userid}/${POST_URL}/${paramsData.postid}/${COMMENT_URL}/${paramsData.commentid}/${REPLY_URL}/${paramsData.replyid}/reaction`
  );
  return response.data;
};

const quoteOnReply = async ({ paramsData, bodyData }) => {
  const response = await axios.post(
    `${USER_URL}/${paramsData.userid}/${POST_URL}/${paramsData.postid}/${COMMENT_URL}/${paramsData.commentid}/${REPLY_URL}/${paramsData.replyid}/quote`,
    bodyData
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
  reactionOnPost,
  quoteOnPost,
  createRepost,
  createComment,
  getComment,
  updateComment,
  deleteComment,
  reactionOnComment,
  quoteOnComment,
  createReply,
  getReply,
  updateReply,
  deleteReply,
  reactionOnReply,
  quoteOnReply,
};
export default socialService;
