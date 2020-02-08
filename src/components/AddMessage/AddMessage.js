import React, { useState } from "react";
import {
  Form,
  Button,
  Message,
  Header,
  TextArea,
  Label,
  Dropdown,
  Checkbox
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
  const [messageChannel, setMessageChannel] = useState(channelId);
  const [priority, setPriority] = useState(false);
  const { id } = jwtDecode(token);
  const addMessageSuccess = json => {
    if (json.status === "success") {
      setSuccess(json.message);
      setError(false);
      setLoading(false);
      navigate(`/`);
    } else if (json.status === "error") {
      setError(json.message);
      setSuccess(false);
      setLoading(false);
    }
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
        ChannelId: messageChannel,
        priority: priority ? true : null
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
      <Header as="h1">Add Message </Header>

      <PageHeader>
        <Dropdown
          placeholder="Select Channel"
          options={channels.map(channel => ({
            key: channel.id,
            value: channel.id,
            text: channel.name
          }))}
          scrolling
          value={messageChannel ? Number(messageChannel) : undefined}
          className="message-container"
          onChange={(e, { value }) => setMessageChannel(value)}
        />
        <Checkbox
          label="priority"
          name="priority"
          checked={priority}
          onChange={() => setPriority(priority => !priority)}
        />
      </PageHeader>
      {error && <Message error>{error}</Message>}
      <Formik
        initialValues={{
          message: "",
          priority: null
        }}
        onSubmit={formSubmit}
        validationSchema={yup.object().shape({
          message: yup
            .string()
            .max(600, "Message cannot exceed 600 characters")
            .required("Message is required")
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
                <>
                  <Button primary type="submit" onClick={handleSubmit}>
                    Save Message
                  </Button>
                </>
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
