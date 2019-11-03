import React, { useState } from "react";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({ username: "" });
  const [authenticated, setAuthenticated] = useState(token ? true : false);
  return (
    <div className="App">
      {!authenticated ? (
        <Login
          setAuthenticated={setAuthenticated}
          setUser={setUser}
          user={user}
        />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;
