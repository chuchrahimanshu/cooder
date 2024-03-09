// Import Section
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
import authReducer from "./auth/auth.slice.js";
import userReducer from "./user/user.slice.js";

// Persist Configuration Section
const authPersistConfig = {
  key: "auth",
  storage,
};
const userPersistConfig = {
  key: "user",
  storage,
};

// Persist Reducer Section
const authPersistedReducer = persistReducer(authPersistConfig, authReducer);
const userPersistedReducer = persistReducer(userPersistConfig, userReducer);

// Store Configuration Section
export const store = configureStore({
  reducer: {
    auth: authPersistedReducer,
    user: userPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk,
    }),
});

// Export Section
export const persistor = persistStore(store);
