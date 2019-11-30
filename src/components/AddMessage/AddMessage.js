import React, { useState } from "react";
import {
  Form,
  Grid,
  Button,
  Message,
  Header,
  TextArea,
  Label,
  Dropdown
} from "semantic-ui-react";
import { Formik } from "formik";
import * as yup from "yup";
import jwtDecode from "jwt-decode";
import { navigate } from "@reach/router";

import urls from "../../constants/urls";
import "./AddMessage.css";

const AddMessage = ({ channelId, channels, token, setLoading, setSuccess }) => {
  const [error, setError] = useState(false);
  const [messageChannel, setMessageChannel] = useState("");
  const { id } = jwtDecode(token);
  const addMessageSuccess = json => {
    if (json.status === "success") {
      setSuccess(json.message);
      setError(false);
      navigate(`/${channelId}/messages/`);
    } else if (json.status === "error") {
      setError(json.message);
      setSuccess(false);
    }
    setLoading(false);
  };
  const formSubmit = ({ message }) => {
    setLoading(true);
    fetch(`${urls.base}/api/v1/messages`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        content: message,
        UserId: id,
        ChannelId: channelId || messageChannel
      })
    })
      .then(response => response.json())
      .then(addMessageSuccess)
      .catch(e => {
        setLoading(false);
        setError("Message could not be saved.");
        setSuccess(false);
        console.error(e);
      });
  };
  return (
    <div>
      <Grid columns={2}>
        <Grid.Row style={{ margin: "2rem 0 1rem" }}>
          <Grid.Column width={channelId ? 16 : 6}>
            <Header as="h3" inverted>
              Add Message{" "}
            </Header>
          </Grid.Column>
          {!channelId && (
            <Grid.Column textAlign="right" width={10}>
              <Dropdown
                placeholder="Select Channel"
                options={channels.map(channel => ({
                  key: channel.id,
                  value: channel.id,
                  text: channel.name
                }))}
                className="message-container"
                onChange={(e, { value }) => setMessageChannel(value)}
              />
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid>
      {error && <Message error>{error}</Message>}
      <Formik
        initialValues={{
          message: ""
        }}
        onSubmit={formSubmit}
        validationSchema={yup.object().shape({
          message: yup.string().required("Message is required")
        })}
      >
        {({ errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form inverted>
            <Form.Field>
              <TextArea
                name="message"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Message"
                style={{ minHeight: 200 }}
              />
              {touched.message && errors.message && (
                <Label pointing prompt color="red">
                  {errors.message}
                </Label>
              )}
            </Form.Field>
            <Form.Field>
              <Button color="teal" type="submit" onClick={handleSubmit}>
                Save Message
              </Button>
            </Form.Field>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddMessage;
