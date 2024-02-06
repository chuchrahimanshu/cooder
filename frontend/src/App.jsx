// Import Section
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthLayout } from "./layouts";
import { Authenticate, ChangePassword, SignIn, SignUp, TFA } from "./pages";

// Configuration Section
axios.defaults.withCredentials = true;

const App = () => {
  // Route Handling Section
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="" element={<Authenticate />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="tfa" element={<TFA />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Route>
    )
  );

  // JSX Componenet Return Section
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        theme="dark"
        newestOnTop
      />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
