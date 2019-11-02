import React, { useState } from "react";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";

function App() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <div className="App">
      {!authenticated ? (
        <Login
          setAuthenticated={setAuthenticated}
          setUser={setUser}
          user={user}
        />
      ) : (
        <Dashboard user={user} />
      )}
    </div>
  );
}

export default App;
