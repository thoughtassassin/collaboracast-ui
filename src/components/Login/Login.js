import React, { useState } from "react";
import "./Login.css";

function Login({ setAuthenticated, setUser, user }) {
  const [error, setError] = useState("");
  const authenticate = json => {
    if (json.status === "success") {
      localStorage.setItem("token", json.data);
      setAuthenticated(true);
    } else if (json.status === "error") {
      setError(json.message);
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    fetch("https://collaboracast.herokuapp.com/api/v1/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password
      })
    })
      .then(response => response.json())
      .then(authenticate);
  };
  return (
    <div>
      <header className="App-header">
        <h1>Don-Nan</h1>
        {error && <div className="error">{error}</div>}
      </header>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username
            <input
              name="username"
              type="text"
              value={user.username || ""}
              onChange={e => setUser({ ...user, username: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              name="username"
              type="password"
              value={user.password || ""}
              onChange={e => setUser({ ...user, password: e.target.value })}
            />
          </label>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
