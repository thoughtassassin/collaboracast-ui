import React, { useState } from "react";
import {
  Grid,
  Form,
  Button,
  Message,
  Header,
  Container,
  Input,
  Label
} from "semantic-ui-react";
import { Formik } from "formik";
import * as yup from "yup";

import "./Login.css";

function Login({ setAuthenticated }) {
  const [error, setError] = useState("");
  const authenticate = json => {
    if (json.status === "success") {
      localStorage.setItem("token", json.data);
      setAuthenticated(true);
    } else if (json.status === "error") {
      setError(json.message);
    }
  };
  const formSubmit = values => {
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
                      <Label pointing color="red">
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
                      <Label pointing color="red">
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
