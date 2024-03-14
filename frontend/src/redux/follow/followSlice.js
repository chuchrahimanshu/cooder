// Import Section
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import followService from "./followService.js";

// Setting Up Initial Global State
const initialState = {
  isLoading: false,
  message: "",
  followers: null,
  following: null,
  users: null,
  followRequests: null,
  showFollowRequests: false,
};

// Creating API Actions
export const userFollowRequests = createAsyncThunk(
  "follow/userFollowRequests",
  async (paramsData, thunkAPI) => {
    try {
      return await followService.userFollowRequests(paramsData);
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

export const createRequest = createAsyncThunk(
  "follow/createRequest",
  async (paramsData, thunkAPI) => {
    try {
      return await followService.createRequest(paramsData);
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

export const acceptRequest = createAsyncThunk(
  "follow/acceptRequest",
  async (paramsData, thunkAPI) => {
    try {
      return await followService.acceptRequest(paramsData);
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

export const rejectRequest = createAsyncThunk(
  "follow/rejectRequest",
  async (paramsData, thunkAPI) => {
    try {
      return await followService.rejectRequest(paramsData);
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

export const removeFollower = createAsyncThunk(
  "follow/removeFollower",
  async (paramsData, thunkAPI) => {
    try {
      return await followService.removeFollower(paramsData);
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

export const unfollowUser = createAsyncThunk(
  "follow/unfollowUser",
  async (paramsData, thunkAPI) => {
    try {
      return await followService.unfollowUser(paramsData);
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

export const notFollowingUsers = createAsyncThunk(
  "follow/notFollowingUsers",
  async (paramsData, thunkAPI) => {
    try {
      return await followService.notFollowingUsers(paramsData);
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
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(userFollowRequests.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(userFollowRequests.fulfilled, (state, action) => {
        state.isLoading = false;
        state.followRequests = action.payload.data.followRequests;
        state.message = action.payload.message;
      })
      .addCase(userFollowRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(createRequest.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(acceptRequest.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(acceptRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(acceptRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(rejectRequest.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(rejectRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(rejectRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(removeFollower.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(removeFollower.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(removeFollower.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(unfollowUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getFollowers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.followers = action.payload.data.followers;
        state.message = action.payload.message;
      })
      .addCase(getFollowers.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getFollowing.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getFollowing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.following = action.payload.data.following;
        state.message = action.payload.message;
      })
      .addCase(getFollowing.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(notFollowingUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(notFollowingUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data.users;
        state.message = action.payload.message;
      })
      .addCase(notFollowingUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

// Export Section
export default followSlice.reducer;
