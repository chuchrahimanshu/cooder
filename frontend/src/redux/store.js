// Import Section
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from "./auth/auth.service.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: [thunk],
});
