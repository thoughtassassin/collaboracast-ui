import React, { useState } from "react";
import AddContact from "../AddContact/AddContact";
import Contacts from "../Contacts/Contacts";
import DashboardContainer from "../DashboardContainer/DashboadContainer";
import { Menu, Icon, Sidebar } from "semantic-ui-react";
import Messages from "../Messages/Messages";
import AddMessage from "../AddMessage/AddMessage";
import Message from "../Message/Message";
import Notifications from "../Notifications/Notifications";
import AddComment from "../AddComment/AddComment";
import useChannels from "../../customHooks/useChannels";
import useNotifications from "../../customHooks/useNotifications";
import useUsers from "../../customHooks/useUsers";
import ItemsList from "../ItemsList/ItemsList";
import urls from "../../constants/urls";
import useLoader from "../../customHooks/useLoader";

import { Router, navigate } from "@reach/router";
import jwtDecode from "jwt-decode";

const AdminDashboard = ({ setAuthenticated }) => {
  const token = localStorage.getItem("token");
  const { id: userId } = jwtDecode(token);
  const [loading, setLoading] = useLoader();
  const [success, setSuccess] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const channels = useChannels();
  const notifications = useNotifications("admin", userId);
  const users = useUsers();

  const menuIcon = (
    <Menu.Item position="right" onClick={() => setIsMenuOpen(true)}>
      <Icon name="align justify" />
    </Menu.Item>
  );

  const dashboardLoading =
    channels.length === 0 ||
    notifications.length === 0 ||
    users.length === 0 ||
    loading;

  return (
    <DashboardContainer
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
            navigate("/operators");
          }}
        >
          <Icon name="envelope outline" />
          Operators
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setIsMenuOpen(false);
            navigate("/users");
          }}
        >
          <Icon name="user circle" />
          Users
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
          success={success}
          setSuccess={setSuccess}
          fetchUrl={`${urls.base}/api/v1/messages`}
          successUrl={`/add-message`}
          default
        />
        <ItemsList
          path="/users"
          listItems={users}
          header="Users"
          displayValue="username"
          resource="users"
        />
        <Messages
          path="/users/:id"
          setLoading={setLoading}
          success={success}
          setSuccess={setSuccess}
          fetchUrl={`${urls.base}/api/v1/messages-by-user/`}
          successUrl={`/add-message`}
        />
        <ItemsList
          path="/operators"
          listItems={channels}
          header="Operators"
          displayValue="name"
          resource="operators"
        />
        <Messages
          path="/operators/:id"
          setLoading={setLoading}
          success={success}
          setSuccess={setSuccess}
          fetchUrl={`${urls.base}/api/v1/channel-messages/`}
          selectMessageTopic
          successUrl={`/add-message`}
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
        <AddMessage
          path="/add-message/:channelId"
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
          header="Notifications"
          displayValue="name"
          resource="notifications"
        />
        <Notifications
          path="/notifications/:notificationId"
          notifications={notifications}
        />
      </Router>
    </DashboardContainer>
  );
};

export default AdminDashboard;
