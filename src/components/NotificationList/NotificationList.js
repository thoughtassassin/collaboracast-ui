import React, { useState } from "react";
import { Button, Dropdown, Message } from "semantic-ui-react";
import ItemsList from "../ItemsList/ItemsList";
import jwtDecode from "jwt-decode";
import NotificationLabel from "../NotificationLabel/NotificationLabel";
import urls from "../../constants/urls";

import "./NotificationList.css";

const NotificationList = ({
  notifications,
  setLoading,
  setSuccess,
  success,
  token,
  userType
}) => {
  const [allNotificationsType, setAllNotificationsType] = useState("");
  const [error, setError] = useState(false);

  const { id } = jwtDecode(token);

  const addSetAllNotificationSuccess = json => {
    if (json.status === "success") {
      setSuccess(json.message);
      setError(false);
      setLoading(false);
    } else if (json.status === "error") {
      setError(json.message);
      setSuccess(false);
      setLoading(false);
    }
  };
  const setNotifications = () => {
    if (
      window.confirm(
        `Are you sure you want to see all notifications to ${allNotificationsType}?`
      )
    ) {
      setLoading(true);
      fetch(`${urls.base}/api/v1/notifications/set-all/${id}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        },
        body: JSON.stringify({
          type: allNotificationsType,
          userType: userType
        })
      })
        .then(response => response.json())
        .then(addSetAllNotificationSuccess)
        .catch(e => {
          setLoading(false);
          setError("All notifications could not be set.");
          setSuccess(false);
          console.error(e);
        });
    }
  };
  return (
    <div className="notifications-list">
      {error && <Message error>{error}</Message>}

      <div class="set-all-notifications">
        <Dropdown
          placeholder="Select Type"
          options={[
            {
              key: 1,
              value: "none",
              text: "None"
            },
            {
              key: 2,
              value: "all",
              text: "All"
            },
            {
              key: 1,
              value: "priority",
              text: "Priority"
            }
          ]}
          inline
          value={allNotificationsType}
          className="all-notifications"
          onChange={(e, { value }) => setAllNotificationsType(value)}
        />
        <Button
          primary
          onClick={setNotifications}
          size="tiny"
          disabled={allNotificationsType === ""}
        >
          Set All Notifications
        </Button>
      </div>
      <ItemsList
        path="/notifications"
        listItems={notifications}
        success={success}
        setSuccess={setSuccess}
        header="Notifications"
        displayValue="name"
        resource="notifications"
        calloutItem={<NotificationLabel />}
        calloutValue="type"
      />
    </div>
  );
};

export default NotificationList;
