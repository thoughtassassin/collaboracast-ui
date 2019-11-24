import React, { useState, useEffect, useCallback } from "react";
import AddContact from "../AddContact/AddContact";
import Contacts from "../Contacts/Contacts";
import DashboardMessages from "../DashboardMessages/DashboardMessages";
import AddMessage from "../AddMessage/AddMessage";
import Message from "../Message/Message";
import AddComment from "../AddComment/AddComment";

import { Router, Link } from "@reach/router";
import jwtDecode from "jwt-decode";
import {
  Button,
  Container,
  Loader,
  Menu,
  Icon,
  Dimmer
} from "semantic-ui-react";

import urls from "../../constants/urls";
import "./Dashboard.css";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const { username } = jwtDecode(token);
  const [channels, setChannels] = useState([]);
  const [channel] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
  const logout = () => {
    localStorage.removeItem("token");
    window.location.assign("/");
  };
  return (
    <Container className="dashboard" text>
      {loading && (
        <Dimmer active={loading} page>
          <Loader size="big">Loading</Loader>
        </Dimmer>
      )}
      <Menu fixed="top" inverted color="teal">
        <Menu.Item>
          <Link to="/">
            <Icon name="user" /> {username}
          </Link>
          <Button size="mini" compact inverted onClick={logout}>
            <Icon name="log out" />
          </Button>
        </Menu.Item>
      </Menu>
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
        <Contacts
          path="/:channelId/contacts/"
          channel={channel}
          setLoading={setLoading}
          loading={loading}
        />
        <AddContact
          path="/add-contact/:channelId"
          channel={channel}
          token={token}
          setLoading={setLoading}
          loading={loading}
        />
      </Router>
    </Container>
  );
};

export default Dashboard;
