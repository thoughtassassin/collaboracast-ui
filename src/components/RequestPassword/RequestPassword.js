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
import urls from "../../constants/urls";
import useLoader from "../../customHooks/useLoader";
import * as yup from "yup";

const RequestPassword = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useLoader();

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
    fetch(`${urls.base}/api/v1/reset-password`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: values.email.trim(),
        url: window.location.origin
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
              <Loader size="big">Logging In</Loader>
            </Dimmer>
          )}
          {!success && <p>Please enter your email address.</p>}
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
                email: yup
                  .string()
                  .email("E-mail is not valid!")
                  .required("This field is required")
              })}
            >
              {({
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit
              }) => (
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
                    <Button type="submit" primary onClick={handleSubmit}>
                      Request Password Reset
                    </Button>
                  </Form.Field>
                </Form>
              )}
            </Formik>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
export default RequestPassword;
