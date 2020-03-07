import React, { useState } from "react";
import { Form, Button, Comment, Header, Input, Label } from "semantic-ui-react";
import { Formik } from "formik";
import * as yup from "yup";
import { navigate } from "@reach/router";

import urls from "../../constants/urls";
import PageHeader from "../PageHeader/PageHeader";

const AddChannel = ({ token, setLoading, setUpdateIncrement, setSuccess }) => {
  const [error, setError] = useState(false);
  const addChannelSuccess = json => {
    if (json.status === "success") {
      setSuccess(json.message);
      setUpdateIncrement(updateIncrement => updateIncrement + 1);
      setError(false);
      setLoading(false);
      navigate(`/channels/`);
    } else if (json.status === "error") {
      setError(json.message);
      setSuccess(false);
      setLoading(false);
    }
  };
  const formSubmit = ({ channel }) => {
    console.log("here in submit: ", channel);
    setLoading(true);
    fetch(`${urls.base}/api/v1/channels`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        name: channel.toUpperCase(),
        FeedId: 2
      })
    })
      .then(response => response.json())
      .then(addChannelSuccess)
      .catch(e => {
        setLoading(false);
        setError("Channel could not be saved.");
        setSuccess(false);
        console.error(e);
      });
  };
  return (
    <div>
      <PageHeader>
        <Header as="h1">Add Channel</Header>
      </PageHeader>
      {error && <Comment error>{error}</Comment>}
      <Formik
        initialValues={{
          channel: ""
        }}
        onSubmit={formSubmit}
        validationSchema={yup.object().shape({
          channel: yup.string().required("Channel name is required")
        })}
      >
        {({
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <Form>
            <Form.Field>
              <Input
                name="channel"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Channel"
              />
              {touched.channel && errors.channel && (
                <Label pointing prompt color="red">
                  {errors.channel}
                </Label>
              )}
            </Form.Field>
            <Form.Field>
              <Button
                primary
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                Save Channel
              </Button>
            </Form.Field>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddChannel;
