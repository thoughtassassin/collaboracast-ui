import React, { useState } from "react";
import AddChannel from "../AddChannel/AddChannel";
import AddContact from "../AddContact/AddContact";
import AddComment from "../AddComment/AddComment";
import AddUser from "../AddUser/AddUser";
import AdminChannelList from "../AdminChannelList/AdminChannelList";
import AdminUsersList from "../AdminUsersList/AdminUsersList";
import AddMessage from "../AddMessage/AddMessage";
import ChannelList from "../ChannelList/ChannelList";
import ChannelUsers from "../ChannelUsers/ChannelUsers";
import Contacts from "../Contacts/Contacts";
import DashboardContainer from "../DashboardContainer/DashboadContainer";
import { Menu, Icon, Sidebar } from "semantic-ui-react";
import Messages from "../Messages/Messages";
import ItemsList from "../ItemsList/ItemsList";
import Message from "../Message/Message";
import NotificationList from "../NotificationList/NotificationList";
import Reports from "../Reports/Reports";
import RequestChannel from "../RequestChannel/RequestChannel";
import SetNotification from "../SetNotification/SetNotification";
import useChannels from "../../customHooks/useChannels";
import useNotifications from "../../customHooks/useNotifications";
import useUsers from "../../customHooks/useUsers";
import urls from "../../constants/urls";
import useLoader from "../../customHooks/useLoader";
import UserChannels from "../UserChannels/UserChannels";

import { Router, navigate } from "@reach/router";
import jwtDecode from "jwt-decode";

const AdminDashboard = ({ setAuthenticated }) => {
  const token = localStorage.getItem("token");
  const {
    id: userId,
    Role: { role },
  } = jwtDecode(token);
  const [loading, setLoading] = useLoader();
  const [success, setSuccess] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [updateIncrement, setUpdateIncrement] = useState(0);
  const channels = useChannels(updateIncrement);
  const notifications = useNotifications(
    "admin",
    userId,
    success === "Notification Added!" ||
      success === "Notification deleted" ||
      success === "Notifications Set!"
  );
  const users = useUsers(updateIncrement);

  const menuIcon = (
    <Menu.Item position="right" onClick={() => setIsMenuOpen(true)}>
      <Icon name="align justify" />
    </Menu.Item>
  );

  const dashboardLoading =
    (!channels || !notifications || users.length === 0) && loading !== false
      ? true
      : false;

  const isDashboardReady =
    Array.isArray(channels) &&
    Array.isArray(notifications) &&
    Array.isArray(users);

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
        <Menu.Item
          onClick={() => {
            setIsMenuOpen(false);
            navigate("/reports");
          }}
        >
          <Icon name="file alternate outline" />
          Reports
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setIsMenuOpen(false);
            navigate("/request-operator");
          }}
        >
          <Icon name="question circle" />
          Request Operator
        </Menu.Item>
        {role === "admin" && (
          <Menu.Item
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/channel-access");
            }}
          >
            <Icon name="key" />
            Channel Acceess
          </Menu.Item>
        )}
      </Sidebar>
      {isDashboardReady ? (
        <Router primary={false}>
          <Messages
            path="/"
            success={success}
            setSuccess={setSuccess}
            fetchUrl={`${urls.base}/api/v1/messages`}
            successUrl={`/add-message`}
            default
          />
          {role !== "admin" && (
            <ItemsList
              path="/users"
              listItems={users}
              header="Users"
              displayValue="username"
              resource="users"
            />
          )}
          {role === "admin" && (
            <AdminUsersList
              path="/users"
              users={users}
              setLoading={setLoading}
              setUpdateIncrement={setUpdateIncrement}
              token={token}
            />
          )}
          {role === "admin" && (
            <AddUser
              path="/add-user"
              token={token}
              setLoading={setLoading}
              setSuccess={setSuccess}
              setUpdateIncrement={setUpdateIncrement}
              success={success}
            />
          )}
          <Messages
            path="/users/:id"
            setLoading={setLoading}
            success={success}
            setSuccess={setSuccess}
            fetchUrl={`${urls.base}/api/v1/messages-by-user/`}
            successUrl={`/add-message`}
          />
          {role !== "admin" && (
            <ChannelList path="/operators" channels={channels} />
          )}
          {role === "admin" && (
            <AdminChannelList
              path="/operators"
              channels={channels}
              setLoading={setLoading}
              setUpdateIncrement={setUpdateIncrement}
              token={token}
            />
          )}
          {role === "admin" && (
            <AddChannel
              path="/add-channel"
              token={token}
              setLoading={setLoading}
              setSuccess={setSuccess}
              setUpdateIncrement={setUpdateIncrement}
              success={success}
            />
          )}
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
          <NotificationList
            path="/notifications"
            notifications={notifications}
            setLoading={setLoading}
            success={success}
            setSuccess={setSuccess}
            token={token}
            userType={role}
          />
          <SetNotification
            path="/notifications/:channelId"
            token={token}
            notifications={notifications}
            setSuccess={setSuccess}
            setLoading={setLoading}
          />
          <Reports
            path="/reports"
            token={token}
            loading={loading}
            setLoading={setLoading}
          />
          <RequestChannel
            path="/request-operator"
            token={token}
            loading={loading}
            setLoading={setLoading}
            setSuccess={setSuccess}
            success={success}
          />
          <ChannelUsers
            path="/channel-users/:channelId"
            token={token}
            loading={loading}
            setLoading={setLoading}
          />
          {role === "admin" && (
            <ItemsList
              path="/channel-access"
              listItems={users.filter((user) => user.RoleId === 3)}
              success={success}
              setSuccess={setSuccess}
              header="Users (Channel Access)"
              displayValue="username"
              resource="channel-access"
              resourceId="email"
              calloutValue="type"
            />
          )}
          {role === "admin" && (
            <UserChannels
              path="/channel-access/:id"
              listItems={channels}
              success={success}
              setSuccess={setSuccess}
              setLoading={setLoading}
              header="Channels for User"
              displayValue="name"
              calloutValue="type"
            />
          )}
        </Router>
      ) : (
        "Dashboard not initialized."
      )}
    </DashboardContainer>
  );
};

export default AdminDashboard;
