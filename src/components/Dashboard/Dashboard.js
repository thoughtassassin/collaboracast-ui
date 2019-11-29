import React, { useState, useEffect, useCallback } from "react";
import AddContact from "../AddContact/AddContact";
import Contacts from "../Contacts/Contacts";
import ContactsChannels from "../ContactsChannels/ContactChannels";
import DashboardContainer from "../DashboardContainer/DashboadContainer";
import DashboardMessages from "../DashboardMessages/DashboardMessages";
import AddMessage from "../AddMessage/AddMessage";
import Message from "../Message/Message";
import AddComment from "../AddComment/AddComment";

import { Router, navigate } from "@reach/router";
import jwtDecode from "jwt-decode";
import { Menu, Icon, Sidebar } from "semantic-ui-react";

import urls from "../../constants/urls";
import "./Dashboard.css";

const Dashboard = ({ setAuthenticated }) => {
  const token = localStorage.getItem("token");
  const { username } = jwtDecode(token);
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const setFeedsAndChannels = useCallback(
    ({ data: { channels } }) => {
      setChannels(channels);
      setLoading(false);
    },
    [setChannels, setLoading]
  );
  const initializeDashboard = useCallback(setFeedsAndChannels, [
    setFeedsAndChannels
  ]);
  const getUser = useCallback(
    (username, token) => {
      setLoading(true);
      fetch(`${urls.base}/api/v1/users/${username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(initializeDashboard)
        .catch(e => {
          setLoading(false);
          console.error(e);
        });
    },
    [initializeDashboard]
  );
  useEffect(() => {
    console.log("representative");
    const token = localStorage.getItem("token");
    getUser(username, token);
  }, [getUser, username]);

  const menuIcon = (
    <Menu.Item position="right" onClick={() => setIsMenuOpen(true)}>
      <Icon name="align justify" />
    </Menu.Item>
  );

  let channel = "";

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
            navigate("/channels");
          }}
        >
          <Icon name="address card" />
          Contacts
        </Menu.Item>
      </Sidebar>
      <Router primary={false}>
        <DashboardMessages
          path="/"
          channels={channels}
          setLoading={setLoading}
          loading={loading}
          success={success}
          setSuccess={setSuccess}
          username={username}
          default
        />
        <AddMessage
          path="/add-message/"
          channels={channels}
          token={token}
          setLoading={setLoading}
          loading={loading}
          setSuccess={setSuccess}
          success={success}
        />
        <Message
          path="/messages/:messageId"
          setLoading={setLoading}
          loading={loading}
          messageId="1"
          success={success}
          setSuccess={setSuccess}
        />
        <AddComment
          path="/add-comment/:messageId"
          token={token}
          setLoading={setLoading}
          loading={loading}
          setSuccess={setSuccess}
          success={success}
        />
        <ContactsChannels
          path="/channels"
          channels={channels}
          setChannel={setChannels}
        />
        <Contacts
          path="/:channelId/contacts/"
          channel={channel}
          setLoading={setLoading}
          loading={loading}
          success={success}
          setSuccess={setSuccess}
          channels={channels}
        />
        <AddContact
          path="/add-contact/:channelId"
          channel={channel}
          token={token}
          setLoading={setLoading}
          loading={loading}
          setSuccess={setSuccess}
          channels={channels}
        />
      </Router>
    </DashboardContainer>
  );
};

export default Dashboard;
