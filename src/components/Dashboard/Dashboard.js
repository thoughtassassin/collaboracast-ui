import React, { useState } from "react";
import AddComment from "../AddComment/AddComment";
import AddContact from "../AddContact/AddContact";
import AddMessage from "../AddMessage/AddMessage";
import Contacts from "../Contacts/Contacts";
import DashboardContainer from "../DashboardContainer/DashboadContainer";
import ItemsList from "../ItemsList/ItemsList";
import Messages from "../Messages/Messages";
import Message from "../Message/Message";
import SetNotification from "../SetNotification/SetNotification";
import useNotifications from "../../customHooks/useNotifications";
import useUserChannels from "../../customHooks/useUserChannels";
import urls from "../../constants/urls";
import useLoader from "../../customHooks/useLoader";

import { Router, navigate } from "@reach/router";
import jwtDecode from "jwt-decode";
import { Menu, Icon, Sidebar } from "semantic-ui-react";

import "./Dashboard.css";

const Dashboard = ({ setAuthenticated }) => {
  const token = localStorage.getItem("token");
  const { email, id: userId } = jwtDecode(token);
  const [loading, setLoading] = useLoader();
  const [success, setSuccess] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const channels = useUserChannels(setLoading, email);
  const notifications = useNotifications(
    "user",
    userId,
    success === "Notification Added!" || success === "Notification deleted"
  );

  const menuIcon = (
    <Menu.Item position="right" onClick={() => setIsMenuOpen(true)}>
      <Icon name="align justify" />
    </Menu.Item>
  );

  const dashboardLoading =
    channels.length === 0 || notifications.length === 0 || loading;

  return (
    <DashboardContainer
      className="dashboard"
      setAuthenticated={setAuthenticated}
      menuIcon={menuIcon}
      loading={dashboardLoading}
    >
      <Sidebar
        as={Menu}
        animation="push"
        direction="right"
        icon="labeled"
        inverted
        vertical
        visible={isMenuOpen}
        width="thin"
      >
        <Menu.Item as="a" onClick={() => setIsMenuOpen(false)}>
          <Icon name="close" />
          Close Menu
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setIsMenuOpen(false);
            navigate("/");
          }}
        >
          <Icon name="envelope outline" />
          Messages
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setIsMenuOpen(false);
            navigate("/contacts");
          }}
        >
          <Icon name="address card" />
          Contacts
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setIsMenuOpen(false);
            navigate("/notifications");
          }}
        >
          <Icon name="bullhorn" />
          Notifications
        </Menu.Item>
      </Sidebar>
      <Router primary={false}>
        <Messages
          path="/"
          setLoading={setLoading}
          success={success}
          setSuccess={setSuccess}
          fetchUrl={`${urls.base}/api/v1/user-messages/${email}`}
          successUrl={`/add-message`}
          user
          default
        />
        <Message
          path="/messages/:messageId"
          setLoading={setLoading}
          messageId="1"
          success={success}
          setSuccess={setSuccess}
        />
        <AddMessage
          path="/add-message"
          channels={channels}
          token={token}
          setLoading={setLoading}
          setSuccess={setSuccess}
          success={success}
        />
        <AddComment
          path="/add-comment/:messageId"
          token={token}
          setLoading={setLoading}
          setSuccess={setSuccess}
          success={success}
        />
        <ItemsList
          path="/contacts"
          listItems={channels}
          header="Contacts"
          displayValue="name"
          resource="contacts"
        />
        <Contacts
          path="/contacts/:channelId"
          setLoading={setLoading}
          success={success}
          setSuccess={setSuccess}
          channels={channels}
        />
        <AddContact
          path="/add-contact/:channelId"
          token={token}
          setLoading={setLoading}
          setSuccess={setSuccess}
          channels={channels}
        />
        <ItemsList
          path="/notifications"
          listItems={notifications}
          success={success}
          setSuccess={setSuccess}
          header="Notifications"
          displayValue="name"
          resource="notifications"
        />
        <SetNotification
          path="/notifications/:channelId"
          token={token}
          notifications={notifications}
          setSuccess={setSuccess}
          setLoading={setLoading}
        />
      </Router>
    </DashboardContainer>
  );
};

export default Dashboard;
