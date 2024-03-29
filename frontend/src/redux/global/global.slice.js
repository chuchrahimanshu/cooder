// Import Section
import { createSlice } from "@reduxjs/toolkit";

// Setting Up Initial Global State
const initialState = {
  theme: "light",
};

// Slice Section - Reducers and Extra Reducers
const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    SET_DARK_THEME(state) {
      state.theme = "dark";
    },
    SET_LIGHT_THEME(state) {
      state.theme = "light";
    },
  },
});

// Export Section
export const { SET_DARK_THEME, SET_LIGHT_THEME } = globalSlice.actions;
export default globalSlice.reducer;
