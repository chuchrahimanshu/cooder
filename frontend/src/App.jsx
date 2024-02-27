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

// Import Components
import { AuthLayout, EditProfileLayout, HomeLayout } from "./layouts";
import {
  Authenticate,
  ChangePassword,
  SignIn,
  SignUp,
  TFA,
  EmailVerification,
  Home,
  Profile,
} from "./pages";
import {
  EditBioAbout,
  EditCodeialAccount,
  EditPersonalDetails,
} from "./components";

// Configuration Section
axios.defaults.withCredentials = true;

const App = () => {
  // Route Handling Section
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<HomeLayout />}>
          <Route path="" element={<Home />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="" element={<Authenticate />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="tfa" element={<TFA />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="verify-email" element={<EmailVerification />} />
        </Route>
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/profile/:username/edit" element={<EditProfileLayout />}>
          <Route path="personal" element={<EditPersonalDetails />} />
          <Route path="account" element={<EditCodeialAccount />} />
          <Route path="bio-about" element={<EditBioAbout />} />
        </Route>
      </>
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

// Export Section
export default App;
