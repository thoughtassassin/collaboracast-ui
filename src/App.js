import React, { useState } from "react";
import Login from "./components/Login/Login";
import "./App.css";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <div className="App">
      {!authenticated ? (
        <Login setAuthenticated={setAuthenticated} />
      ) : (
        <div>logged in</div>
      )}
    </div>
  );
}

export default App;
