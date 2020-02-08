import React, { useState } from "react";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import Dashboard from "./components/Dashboard/Dashboard";
import jwtDecode from "jwt-decode";
import Authenticate from "./components/Authenticate/Authenticate";

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
        <Authenticate
          setAuthenticated={setAuthenticated}
          setUser={setUser}
          user={user}
        />
      ) : roleName && roleName === "representative" ? (
        <Dashboard setAuthenticated={setAuthenticated} />
      ) : (
        <AdminDashboard setAuthenticated={setAuthenticated} />
      )}
    </div>
  );
}

export default App;
