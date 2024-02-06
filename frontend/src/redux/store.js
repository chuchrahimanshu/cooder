// Import Section
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
import authReducer from "./auth/auth.slice.js";

// Persist Configuration Section
const authPersistConfig = {
  key: "auth",
  storage,
};

// Persist Reducer Section
const authPersistedReducer = persistReducer(authPersistConfig, authReducer);

// Store Configuration Section
export const store = configureStore({
  reducer: {
    auth: authPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk,
    }),
});

// Export Section
export const persistor = persistStore(store);
