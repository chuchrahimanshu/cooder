import React from "react";
import ReactDOM from "react-dom/client";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import "./styles/css/main.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider
          clientId={
            process.env.REACT_APP_COODER_ENVIRONMENT === "DEVELOPMENT"
              ? process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID_DEVELOPMENT
              : process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID_PRODUCTION
          }>
          <App />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
