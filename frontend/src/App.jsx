import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Authenticate } from "./pages/auth/Authenticate";
import { AuthLayout } from "./layouts/AuthLayout";
import { SignUp } from "./pages/auth/SignUp";
import { SignIn } from "./pages/auth/SignIn";
import { TFA } from "./pages/auth/TFA";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="" element={<Authenticate />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="tfa" element={<TFA />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
