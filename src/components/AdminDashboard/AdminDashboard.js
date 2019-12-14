import React, { useState } from "react";
import AddContact from "../AddContact/AddContact";
import Contacts from "../Contacts/Contacts";
import ContactsChannels from "../ContactsChannels/ContactChannels";
import DashboardContainer from "../DashboardContainer/DashboadContainer";
import { Menu, Icon, Sidebar } from "semantic-ui-react";
import Messages from "../Messages/Messages";
import AddMessage from "../AddMessage/AddMessage";
import Message from "../Message/Message";
import AddComment from "../AddComment/AddComment";
import useChannels from "../../customHooks/useChannels";
import OperatorChannels from "../OperatorChannels/OperatorChannels";
import UsersChannels from "../UsersChannels/UsersChannels";

import { Router, navigate } from "@reach/router";

const AdminDashboard = ({ setAuthenticated }) => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const channels = useChannels(setLoading);

  const menuIcon = (
    <Menu.Item position="right" onClick={() => setIsMenuOpen(true)}>
      <Icon name="align justify" />
    </Menu.Item>
  );

  return (
    <DashboardContainer
      setAuthenticated={setAuthenticated}
      menuIcon={menuIcon}
      loading={loading}
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
      </Sidebar>
      <Router primary={false}>
        <Messages
          path="/"
          setLoading={setLoading}
          success={success}
          setSuccess={setSuccess}
        />
        <UsersChannels path="/users" setLoading={setLoading} />
        <Messages
          path="/messages-by-user/:userId/"
          setLoading={setLoading}
          success={success}
          setSuccess={setSuccess}
        />
        <OperatorChannels path="/operators" channels={channels} />
        <Messages
          path="/channel-messages/:channelId/"
          setLoading={setLoading}
          success={success}
          setSuccess={setSuccess}
        />
        <Message
          path="/messages/:messageId"
          setLoading={setLoading}
          messageId="1"
          success={success}
          setSuccess={setSuccess}
        />
        <AddMessage
          path="/add-message/"
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
        <ContactsChannels path="/contacts" channels={channels} />
        <Contacts
          path="/:channelId/contacts/"
          setLoading={setLoading}
          success={success}
          setSuccess={setSuccess}
          channels={channels}
        />
        <AddContact
          path="/add-contact/:channelId"
          token={token}
          channels={channels}
          setLoading={setLoading}
          setSuccess={setSuccess}
        />
      </Router>
    </DashboardContainer>
  );
};

export default AdminDashboard;
