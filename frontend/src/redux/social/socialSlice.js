// Import Section
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import socialService from "./socialService";
import { toast } from "react-toastify";

// Setting Up Initial Global State
const initialState = {
  isLoading: false,
  message: "",
  posts: null,
  post: null,
  comment: null,
  reply: null,
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

export const getPost = createAsyncThunk(
  "social/getPost",
  async (paramsData, thunkAPI) => {
    try {
      return await socialService.getPost(paramsData);
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

export const updatePost = createAsyncThunk(
  "social/updatePost",
  async (apiData, thunkAPI) => {
    try {
      return await socialService.updatePost(
        apiData.paramsData,
        apiData.bodydata
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

export const deletePost = createAsyncThunk(
  "social/deletePost",
  async (paramsData, thunkAPI) => {
    try {
      return await socialService.deletePost(paramsData);
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

export const createComment = createAsyncThunk(
  "social/createComment",
  async (apiData, thunkAPI) => {
    try {
      return await socialService.createComment(apiData);
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

export const getComment = createAsyncThunk(
  "social/getComment",
  async (paramsData, thunkAPI) => {
    try {
      return await socialService.getComment(paramsData);
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

export const updateComment = createAsyncThunk(
  "social/updateComment",
  async (apiData, thunkAPI) => {
    try {
      return await socialService.updateComment(
        apiData.paramsData,
        apiData.bodydata
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

export const deleteComment = createAsyncThunk(
  "social/deleteComment",
  async (paramsData, thunkAPI) => {
    try {
      return await socialService.deleteComment(paramsData);
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

export const createReply = createAsyncThunk(
  "social/createReply",
  async (apiData, thunkAPI) => {
    try {
      return await socialService.createReply(
        apiData.paramsData,
        apiData.bodydata
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

export const getReply = createAsyncThunk(
  "social/getReply",
  async (paramsData, thunkAPI) => {
    try {
      return await socialService.getReply(paramsData);
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

export const updateReply = createAsyncThunk(
  "social/updateReply",
  async (apiData, thunkAPI) => {
    try {
      return await socialService.updateReply(
        apiData.paramsData,
        apiData.bodydata
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

export const deleteReply = createAsyncThunk(
  "social/deleteReply",
  async (paramsData, thunkAPI) => {
    try {
      return await socialService.deleteReply(paramsData);
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
      })
      .addCase(getPost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload.data.post;
        state.message = action.payload.message;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updatePost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deletePost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(createComment.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getComment.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comment = action.payload.data.comment;
        state.message = action.payload.message;
      })
      .addCase(getComment.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateComment.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteComment.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(createReply.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createReply.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(createReply.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getReply.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getReply.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reply = action.payload.data.reply;
        state.message = action.payload.message;
      })
      .addCase(getReply.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateReply.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateReply.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(updateReply.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteReply.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteReply.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteReply.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

// Export Section
export default socialSlice.reducer;
