// Import Section
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import socialService from "./socialService";
import { toast } from "react-toastify";

// Setting Up Initial Global State
const initialState = {
  isLoading: false,
  message: "",
  posts: null,
};

// Creating API Actions
export const getAllFollowingPosts = createAsyncThunk(
  "social/getAllFollowingPosts",
  async (paramsData, thunkAPI) => {
    try {
      return await socialService.getAllFollowingPosts(paramsData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createPost = createAsyncThunk(
  "social/createPost",
  async (apiData, thunkAPI) => {
    try {
      return await socialService.createPost(apiData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Slice Section - Reducers and Extra Reducers
const socialSlice = createSlice({
  name: "social",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllFollowingPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllFollowingPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.data.posts;
        state.message = action.payload.message;
      })
      .addCase(getAllFollowingPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(createPost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

// Export Section
export default socialSlice.reducer;
