import React, { useState } from "react";
import AddContact from "../AddContact/AddContact";
import Contacts from "../Contacts/Contacts";
import DashboardContainer from "../DashboardContainer/DashboadContainer";
import AddMessage from "../AddMessage/AddMessage";
import ItemsList from "../ItemsList/ItemsList";
import Messages from "../Messages/Messages";
import Message from "../Message/Message";
import AddComment from "../AddComment/AddComment";
import useUserChannels from "../../customHooks/useUserChannels";
import urls from "../../constants/urls";
import useLoader from "../../customHooks/useLoader";

import { Router, navigate } from "@reach/router";
import jwtDecode from "jwt-decode";
import { Menu, Icon, Sidebar } from "semantic-ui-react";

import "./Dashboard.css";

const Dashboard = ({ setAuthenticated }) => {
  const token = localStorage.getItem("token");
  const { email } = jwtDecode(token);
  const [loading, setLoading] = useLoader();
  const [success, setSuccess] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const channels = useUserChannels(setLoading, email);

  const menuIcon = (
    <Menu.Item position="right" onClick={() => setIsMenuOpen(true)}>
      <Icon name="align justify" />
    </Menu.Item>
  );

  return (
    <DashboardContainer
      className="dashboard"
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
      </Router>
    </DashboardContainer>
  );
};

export default Dashboard;
