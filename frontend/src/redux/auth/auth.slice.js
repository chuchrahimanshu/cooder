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
  uniqueUsername: "",
  tfaVerification: false,
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

export const verifyUsername = createAsyncThunk(
  "auth/verifyUsername",
  async (paramData, thunkAPI) => {
    try {
      return await authService.verifyUsername(paramData);
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

export const userSignIn = createAsyncThunk(
  "auth/userSignIn",
  async (apiData, thunkAPI) => {
    try {
      return await authService.userSignIn(apiData);
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

export const generateChangePasswordToken = createAsyncThunk(
  "auth/generateChangePasswordToken",
  async (paramData, thunkAPI) => {
    try {
      return await authService.generateChangePasswordToken(paramData);
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

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (apiData, thunkAPI) => {
    try {
      return await authService.changePassword(
        apiData.apiData,
        apiData.paramData
      );
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

export const userSignOut = createAsyncThunk(
  "auth/userSignOut",
  async (_, thunkAPI) => {
    try {
      return await authService.userSignOut();
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

export const generateTFAToken = createAsyncThunk(
  "auth/generateTFAToken",
  async (paramData, thunkAPI) => {
    try {
      return await authService.generateTFAToken(paramData);
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

export const verifyTFAToken = createAsyncThunk(
  "auth/verifyTFAToken",
  async (apiData, thunkAPI) => {
    try {
      return await authService.verifyTFAToken(
        apiData.apiData,
        apiData.paramData
      );
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
    RESET_PARAMETERS(state) {
      state.existingUser = false;
      state.isAuthenticated = false;
      state.uniqueUsername = false;
      state.tfaVerification = false;
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
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(verifyUsername.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(verifyUsername.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isLoggedIn = false;
        state.user = null;
        state.uniqueUsername = action.payload.data.uniqueUsername;
        state.message = action.payload.message;
      })
      .addCase(verifyUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.isLoggedIn = false;
        state.user = null;
        state.uniqueUsername = null;
        state.message = action.payload;
      })
      .addCase(userSignIn.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isLoggedIn = !action.payload.data.tfaVerification;
        state.user = action.payload.data.user;
        state.tfaVerification = action.payload.data.tfaVerification;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(userSignIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.isLoggedIn = false;
        state.user = null;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(generateChangePasswordToken.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(generateChangePasswordToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isLoggedIn = false;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(generateChangePasswordToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.isLoggedIn = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(changePassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isLoggedIn = false;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.isLoggedIn = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(userSignOut.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(userSignOut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isLoggedIn = false;
        state.user = null;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(userSignOut.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.isLoggedIn = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(generateTFAToken.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(generateTFAToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isLoggedIn = false;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(generateTFAToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.isLoggedIn = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(verifyTFAToken.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(verifyTFAToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isLoggedIn = true;
        state.user = action.payload.data.user;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(verifyTFAToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.isLoggedIn = false;
        state.user = null;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

// Export Section
export const { RESET, RESET_PARAMETERS } = authSlice.actions;
export default authSlice.reducer;
