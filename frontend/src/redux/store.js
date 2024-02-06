// Import Section
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { authService } from "./auth/auth.service.js";

export const store = configureStore({
  reducer: {
    auth: authService,
  },
  middleware: [thunk],
});
