import React, { useState } from "react";
import {
  Grid,
  Form,
  Button,
  Message,
  Header,
  Input,
  Label,
  Loader,
  Dimmer
} from "semantic-ui-react";
import { Formik } from "formik";
import * as yup from "yup";

import urls from "../../constants/urls";
import useLoader from "../../customHooks/useLoader";
import "./Login.css";

function Login({ setAuthenticated }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useLoader();

  const authenticate = json => {
    if (json.status === "success") {
      localStorage.setItem("token", json.data);
      setLoading(false);
      setAuthenticated(true);
    } else if (json.status === "error") {
      setError(json.message);
      setLoading(false);
    }
  };
  const formSubmit = values => {
    setLoading(true);
    fetch(`${urls.base}/api/v1/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: values.email.trim(),
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
    <Grid columns={1} centered className="login">
      <Grid.Row>
        <Grid.Column>
          <Header as="h1">Don-Nan</Header>
          {loading && (
            <Dimmer active={loading} page>
              <Loader size="big">Logging In</Loader>
            </Dimmer>
          )}
          {error && <Message error content={error} />}
          <Formik
            initialValues={{
              email: "",
              password: ""
            }}
            onSubmit={formSubmit}
            validationSchema={yup.object().shape({
              email: yup.string().required("This field is required"),
              password: yup.string().required("This field is required")
            })}
          >
            {({ errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <Form size="small">
                <Form.Field>
                  <Input
                    name="email"
                    type="text"
                    label={{ basic: true, content: "Email" }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.email && errors.email && (
                    <Label pointing prompt color="red">
                      {errors.email}
                    </Label>
                  )}
                </Form.Field>
                <Form.Field>
                  <Input
                    name="password"
                    type="password"
                    label={{ basic: true, content: "Password" }}
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
                  <Button type="submit" primary onClick={handleSubmit}>
                    Login
                  </Button>
                </Form.Field>
              </Form>
            )}
          </Formik>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Login;
