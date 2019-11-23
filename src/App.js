import React, { useState } from "react";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import jwtDecode from "jwt-decode";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  let roleName;
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({ username: "" });
  const [authenticated, setAuthenticated] = useState(token ? true : false);
  if (authenticated) {
    const {
      Role: { role }
    } = jwtDecode(token);
    roleName = role;
    console.log(role);
  }
  return (
    <div className="App">
      {!authenticated ? (
        <Login
          setAuthenticated={setAuthenticated}
          setUser={setUser}
          user={user}
        />
      ) : roleName && roleName === "representative" ? (
        <Dashboard />
      ) : (
        <AdminDashboard setAuthenticated={setAuthenticated} />
      )}
    </div>
  );
}

export default App;
