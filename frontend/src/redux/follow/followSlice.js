// Import Section
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import followService from "./followService.js";
import { toast } from "react-toastify";

// Setting Up Initial Global State
const initialState = {
  isLoggedIn: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  followers: null,
  following: null,
};

// Creating API Actions
export const updateFollowRelation = createAsyncThunk(
  "follow/updateFollowRelation",
  async (paramsData, thunkAPI) => {
    try {
      return await followService.updateFollowRelation(paramsData);
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

export const getFollowers = createAsyncThunk(
  "follow/getFollowers",
  async (paramsData, thunkAPI) => {
    try {
      return await followService.getFollowers(paramsData);
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

export const getFollowing = createAsyncThunk(
  "follow/getFollowing",
  async (paramsData, thunkAPI) => {
    try {
      return await followService.getFollowing(paramsData);
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
const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    RESET(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateFollowRelation.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateFollowRelation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(updateFollowRelation.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFollowers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.followers = action.payload.data.followers;
        state.message = action.payload.message;
      })
      .addCase(getFollowers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFollowing.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFollowing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.following = action.payload.data.following;
        state.message = action.payload.message;
      })
      .addCase(getFollowing.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Export Section
export const { RESET } = followSlice.actions;
export default followSlice.reducer;
