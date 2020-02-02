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
import PasswordStrengthMeter from "../PasswordStrengthMeter/PasswordStrengthMeter";
import urls from "../../constants/urls";
import useLoader from "../../customHooks/useLoader";
import * as yup from "yup";

const ResetPassword = ({}) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useLoader();

  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");
  const token = params.get("token");

  const getResponse = json => {
    if (json.status === "success") {
      setSuccess(json.message);
      setError("");
    } else if (json.status === "error") {
      setSuccess("");
      if (json.message.name) {
        setError("Unable to reset password for that email.");
        console.error(json.message);
      } else {
        setError(json.message);
      }
    }
    setLoading(false);
  };
  const formSubmit = values => {
    setLoading(true);
    fetch(`${urls.base}/api/v1/reset-password/${email}/${token}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: values.password.trim(),
        confirmPassword: values.password.trim()
      })
    })
      .then(response => response.json())
      .then(getResponse)
      .catch(e => {
        setLoading(false);
        setSuccess("");
        e.message
          ? e.message.name
            ? setError(e.message.name)
            : setError(e.message)
          : setError(e);
        console.error(e);
      });
  };
  return (
    <Grid columns={1} centered className="login">
      <Grid.Row>
        <Grid.Column>
          <Header as="h1">Don-Nan</Header>
          {loading && (
            <Dimmer active={loading} inverted page>
              <Loader size="big">Resetting Password</Loader>
            </Dimmer>
          )}
          {!success && (
            <p>
              Please enter new password. The password strength meter indicates
              how secure your password is.{" "}
            </p>
          )}
          {error && <Message error content={error} />}
          {success && <Message success content={success} />}
          {!success && (
            <Formik
              initialValues={{
                email: "",
                password: ""
              }}
              onSubmit={formSubmit}
              validationSchema={yup.object().shape({
                password: yup.string().required("This field is required"),
                confirmPassword: yup
                  .string()
                  .oneOf([yup.ref("password"), null], "Passwords don't match!")
                  .required("This field is required")
              })}
            >
              {({
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                values: { password }
              }) => (
                <>
                  {" "}
                  <PasswordStrengthMeter password={password} />
                  <Form size="small">
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
                      <Input
                        name="confirmPassword"
                        type="password"
                        label={{ basic: true, content: "Confirm" }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.confirmPassword && errors.confirmPassword && (
                        <Label pointing prompt color="red">
                          {errors.confirmPassword}
                        </Label>
                      )}
                    </Form.Field>
                    <Form.Field>
                      <Button type="submit" primary onClick={handleSubmit}>
                        Set Password
                      </Button>
                    </Form.Field>
                  </Form>
                </>
              )}
            </Formik>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ResetPassword;
