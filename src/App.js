import React, { useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState({ username: "", password: "" });
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
      .then(response => response.text())
      .then(token => localStorage.setItem("token", JSON.parse(token).data));
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Don-Nan</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Username
              <input
                name="username"
                type="text"
                value={user.username}
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
                value={user.password}
                onChange={e => setUser({ ...user, password: e.target.value })}
              />
            </label>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default App;
