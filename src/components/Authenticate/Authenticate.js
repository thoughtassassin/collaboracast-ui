import React from "react";
import Login from "../Login/Login";
import RequestPassword from "../RequestPassword/RequestPassword";
import ResetPassword from "../ResetPassword/ResetPassword";
import { Router } from "@reach/router";

const Authenticate = ({ setAuthenticated, setUser, user }) => (
  <Router primary={false}>
    <Login
      setAuthenticated={setAuthenticated}
      setUser={setUser}
      user={user}
      default
    />
    <RequestPassword path="request-password-reset" />
    <ResetPassword path="/reset-password" />
  </Router>
);

export default Authenticate;
