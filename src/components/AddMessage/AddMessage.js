import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Dropdown,
  Form,
  Header,
  Label,
  Message,
  Radio,
  TextArea,
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
  const [interaction, setInteraction] = useState(false);

  const { id } = jwtDecode(token);
  const addMessageSuccess = (json, setSubmitting) => {
    if (json.status === "success") {
      setSuccess(json.message);
      setError(false);
      setLoading(false);
      navigate(`/`);
    } else if (json.status === "error") {
      setError(json.message);
      setSuccess(false);
      setLoading(false);
      setSubmitting(false);
    }
  };
  const formSubmit = ({ message }, { setSubmitting }) => {
    setLoading(true);
    fetch(`${urls.base}/api/v1/messages`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        content: message,
        UserId: id,
        ChannelId: messageChannel,
        priority: priority ? true : null,
        interaction: interaction,
        url: window.location.origin,
      }),
    })
      .then((response) => response.json())
      .then((json) => addMessageSuccess(json, setSubmitting))
      .catch((e) => {
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
          options={channels.map((channel) => ({
            key: channel.id,
            value: channel.id,
            text: channel.name,
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
          onChange={() => setPriority((priority) => !priority)}
        />
      </PageHeader>
      {error && <Message error>{error}</Message>}
      <Formik
        initialValues={{
          message: "",
          priority: null,
        }}
        onSubmit={formSubmit}
        validationSchema={yup.object().shape({
          message: yup
            .string()
            .max(600, "Message cannot exceed 600 characters")
            .required("Message is required"),
        })}
      >
        {({
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form>
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
              <Form.Group className="interaction-type">
                <label>Interaction Type</label>
                <Form.Field
                  control={Radio}
                  label="Call"
                  value="call"
                  checked={interaction === "call"}
                  onChange={(e, { value }) => setInteraction(value)}
                />
                <Form.Field
                  control={Radio}
                  label="Email"
                  value="email"
                  checked={interaction === "email"}
                  onChange={(e, { value }) => setInteraction(value)}
                />
                <Form.Field
                  control={Radio}
                  label="In Person"
                  value="in-person"
                  checked={interaction === "in-person"}
                  onChange={(e, { value }) => setInteraction(value)}
                />
              </Form.Group>
            </Form.Field>
            <Form.Field>
              {(channelId || messageChannel) && interaction ? (
                <>
                  <Button
                    primary
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    Save Message
                  </Button>
                </>
              ) : (
                <div>
                  {!messageChannel && (
                    <div className="help">
                      Please select a channel from the Select Channel menu.
                    </div>
                  )}
                  {!interaction && (
                    <div className="help">
                      Please select an interaction type.
                    </div>
                  )}
                </div>
              )}
            </Form.Field>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddMessage;
