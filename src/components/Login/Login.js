import React, { useState } from "react";
import {
  Grid,
  Form,
  Button,
  Message,
  Header,
  Container
} from "semantic-ui-react";

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
        username: user.username.trim(),
        password: user.password.trim()
      })
    })
      .then(response => response.json())
      .then(authenticate);
  };
  return (
    <Grid verticalAlign="top" columns={1} centered className="login">
      <Grid.Row>
        <Grid.Column>
          <Container text>
            <Header as="h1" inverted>
              Don-Nan
            </Header>
            {error && <Message error content={error} />}
            <Form onSubmit={handleSubmit} inverted size="small">
              <Form.Field>
                <label>
                  Username
                  <input
                    name="username"
                    type="text"
                    value={user.username || ""}
                    onChange={e =>
                      setUser({ ...user, username: e.target.value })
                    }
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label>
                  Password
                  <input
                    name="username"
                    type="password"
                    value={user.password || ""}
                    onChange={e =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <Button color="teal" type="submit">
                  Login
                </Button>
              </Form.Field>
            </Form>
          </Container>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Login;
