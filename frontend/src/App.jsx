import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { AuthLayout } from "./layouts";
import { Authenticate, ChangePassword, SignIn, SignUp, TFA } from "./pages";

const App = () => {
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

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
