import React, { useState } from "react";
import { Form, Button, Comment, Header, Radio } from "semantic-ui-react";
import { Formik } from "formik";
import jwtDecode from "jwt-decode";
import { navigate } from "@reach/router";

import urls from "../../constants/urls";
import PageHeader from "../PageHeader/PageHeader";
const SetNotification = ({
  channelId,
  notifications,
  setSuccess,
  setLoading,
  token
}) => {
  const notification = notifications.find(
    item => item.id === parseInt(channelId)
  );
  const [error, setError] = useState(false);
  const [type, setType] = useState(
    notification && notification.type ? notification.type : ""
  );
  const { id } = jwtDecode(token);

  const addNotificationSuccess = json => {
    console.log("in addNotificationSuccess: ", json);
    if (json.status === "success") {
      setSuccess(json.message);
      setError(false);
      navigate(`/notifications`);
    } else if (json.status === "error") {
      setError(json.message);
      setSuccess(false);
    }
    setLoading(false);
  };
  const formSubmit = async () => {
    setLoading(true);
    try {
      if (notification && notification.notificationId) {
        const deleteResponse = await fetch(
          `${urls.base}/api/v1/notifications/${notification.notificationId}`,
          {
            method: "delete",
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${token}`
            }
          }
        );
        if (!type) {
          addNotificationSuccess(await deleteResponse.json());
        }
      }
      if (type) {
        const addResponse = await fetch(`${urls.base}/api/v1/notifications`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`
          },
          body: JSON.stringify({
            type,
            UserId: id,
            ChannelId: channelId
          })
        });
        addNotificationSuccess(await addResponse.json());
      }
      if (notification && !notification.notificationId && !type) {
        setLoading(false);
      }
    } catch (e) {
      setError(e);
    }
  };
  const handleChange = (e, { value }) => {
    setType(value);
  };
  return (
    <div className="notifications">
      <PageHeader>
        <Header as="h3">
          Set Notifications for {notification && notification.name}
        </Header>
      </PageHeader>
      {error && <Comment error>{error}</Comment>}
      <Formik
        initialValues={{
          type: notification && notification.type ? notification.type : ""
        }}
        onSubmit={formSubmit}
      >
        {({ errors, touched, handleBlur, handleSubmit }) => (
          <Form>
            <Form.Field>
              Selected value: <b>{type || "none"}</b>
            </Form.Field>
            <Form.Field>
              <Radio
                label="None"
                name="type"
                value=""
                checked={type === ""}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="Priority"
                name="type"
                value="priority"
                checked={type === "priority"}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="All"
                name="type"
                value="all"
                checked={type === "all"}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Button primary type="submit" onClick={handleSubmit}>
                Set Notification
              </Button>
            </Form.Field>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SetNotification;
