import React, { useState } from "react";
import {
  Grid,
  Form,
  Button,
  Message,
  Header,
  Container,
  Input,
  Label,
  Loader,
  Dimmer
} from "semantic-ui-react";
import { Formik } from "formik";
import * as yup from "yup";

import "./Login.css";

function Login({ setAuthenticated }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const authenticate = json => {
    if (json.status === "success") {
      localStorage.setItem("token", json.data);
      setAuthenticated(true);
    } else if (json.status === "error") {
      setError(json.message);
    }
    setLoading(false);
  };
  const formSubmit = values => {
    setLoading(true);
    fetch("https://collaboracast.herokuapp.com/api/v1/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: values.username.trim(),
        password: values.password.trim()
      })
    })
      .then(response => response.json())
      .then(authenticate)
      .catch(e => {
        setLoading(false);
        console.error(e);
      });
  };
  return (
    <Grid verticalAlign="top" columns={1} centered className="login">
      <Grid.Row>
        <Grid.Column>
          <Container text>
            <Header as="h1" inverted>
              Don-Nan
            </Header>
            {loading && (
              <Dimmer active={loading} page>
                <Loader size="big">Logging In</Loader>
              </Dimmer>
            )}
            {error && <Message error content={error} />}
            <Formik
              initialValues={{
                username: "",
                password: ""
              }}
              onSubmit={formSubmit}
              validationSchema={yup.object().shape({
                username: yup.string().required("This field is required"),
                password: yup.string().required("This field is required")
              })}
            >
              {({
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit
              }) => (
                <Form inverted size="small">
                  <Form.Field>
                    <Input
                      name="username"
                      type="text"
                      label="Username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.username && errors.username && (
                      <Label pointing prompt color="red">
                        {errors.username}
                      </Label>
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Input
                      name="password"
                      type="password"
                      label="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.password && errors.password && (
                      <Label pointing prompt color="red">
                        {errors.password}
                      </Label>
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Button color="teal" type="submit" onClick={handleSubmit}>
                      Login
                    </Button>
                  </Form.Field>
                </Form>
              )}
            </Formik>
          </Container>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Login;
