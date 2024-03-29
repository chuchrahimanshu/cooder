// Import Section
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
import globalReducer from "./global/global.slice.js";
import authReducer from "./auth/auth.slice.js";
import userReducer from "./user/user.slice.js";
import followReducer from "./follow/followSlice.js";
import socialReducer from "./social/socialSlice.js";

// Persist Configuration Section
const globalPersistConfig = {
  key: "global",
  storage,
};
const authPersistConfig = {
  key: "auth",
  storage,
};
const userPersistConfig = {
  key: "user",
  storage,
};

// Persist Reducer Section
const globalPersistedReducer = persistReducer(
  globalPersistConfig,
  globalReducer
);
const authPersistedReducer = persistReducer(authPersistConfig, authReducer);
const userPersistedReducer = persistReducer(userPersistConfig, userReducer);

// Store Configuration Section
export const store = configureStore({
  reducer: {
    global: globalPersistedReducer,
    auth: authPersistedReducer,
    user: userPersistedReducer,
    follow: followReducer,
    social: socialReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk,
    }),
});

// Export Section
export const persistor = persistStore(store);
