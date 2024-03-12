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
  users: null,
  followRequests: null,
  showFollowRequests: false,
};

// Creating API Actions
export const getFollowRequests = createAsyncThunk(
  "follow/getFollowRequests",
  async (paramsData, thunkAPI) => {
    try {
      return await followService.getFollowRequests(paramsData);
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

export const pushFollowRequest = createAsyncThunk(
  "follow/pushFollowRequest",
  async (paramsData, thunkAPI) => {
    try {
      return await followService.pushFollowRequest(paramsData);
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

export const userFollowDetails = createAsyncThunk(
  "follow/userFollowDetails",
  async (paramsData, thunkAPI) => {
    try {
      return await followService.userFollowDetails(paramsData);
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

export const deleteFollower = createAsyncThunk(
  "follow/deleteFollower",
  async (paramsData, thunkAPI) => {
    try {
      return await followService.deleteFollower(paramsData);
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

export const deleteFollowing = createAsyncThunk(
  "follow/deleteFollowing",
  async (paramsData, thunkAPI) => {
    try {
      return await followService.deleteFollowing(paramsData);
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

export const rejectFollowRequest = createAsyncThunk(
  "follow/rejectFollowRequest",
  async (paramsData, thunkAPI) => {
    try {
      return await followService.rejectFollowRequest(paramsData);
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
    SHOW_FOLLOW_REQUESTS(state) {
      state.showFollowRequests = !state.showFollowRequests;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getFollowRequests.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFollowRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.followRequests = action.payload.data.followRequests;
        state.message = action.payload.message;
      })
      .addCase(getFollowRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(pushFollowRequest.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(pushFollowRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(pushFollowRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
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
      })
      .addCase(userFollowDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(userFollowDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.users = action.payload.data.users;
        state.message = action.payload.message;
      })
      .addCase(userFollowDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteFollower.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteFollower.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(deleteFollower.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteFollowing.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteFollowing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(deleteFollowing.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(rejectFollowRequest.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(rejectFollowRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(rejectFollowRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Export Section
export const { RESET, SHOW_FOLLOW_REQUESTS } = followSlice.actions;
export default followSlice.reducer;
