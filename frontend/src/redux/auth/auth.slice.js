// Import Section
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService from "./auth.service.js";

// Setting Up Initial Global State
const initialState = {
  isLoggedIn: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  user: null,
  existingUser: false,
  isAuthenticated: false,
  uniqueUsername: false,
};

// Creating API Actions
export const verifyNewUser = createAsyncThunk(
  "auth/verifyNewUser",
  async (apiData, thunkAPI) => {
    try {
      return await authService.verifyNewUser(apiData);
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
const authSlice = createSlice({
  name: "auth",
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
      .addCase(verifyNewUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(verifyNewUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isLoggedIn = false;
        state.user = null;
        state.existingUser = action.payload.data.existingUser;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(verifyNewUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.isLoggedIn = false;
        state.user = null;
        state.existingUser = action.payload.data.existingUser;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

// Export Section
export const { RESET } = authSlice.actions;
export default authSlice.reducer;
