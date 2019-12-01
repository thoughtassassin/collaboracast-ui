import React, { useState } from "react";
import {
  Form,
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
import PageHeader from "../PageHeader/PageHeader";
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
      <PageHeader>
        <Header as="h3">Add Message </Header>
        {!channelId && (
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
        )}
      </PageHeader>
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
              {channelId ? (
                <Button primary type="submit" onClick={handleSubmit}>
                  Save Message
                </Button>
              ) : messageChannel ? (
                <Button primary type="submit" onClick={handleSubmit}>
                  Save Message
                </Button>
              ) : (
                "Please select a channel from the Select Channel menu to save message."
              )}
            </Form.Field>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddMessage;
