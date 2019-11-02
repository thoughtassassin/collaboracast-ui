import React, { useState } from "react";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";

function App() {
  const token = localStorage.getItem("token");
  console.log(token);
  const [user, setUser] = useState({ username: "" });
  const setPersistentUser = user => {
    setUser(user);
    localStorage.setItem("username", user.username);
  };
  const [authenticated, setAuthenticated] = useState(token ? true : false);
  return (
    <div className="App">
      {!authenticated ? (
        <Login
          setAuthenticated={setAuthenticated}
          setUser={setPersistentUser}
          user={user}
        />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;
