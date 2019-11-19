import React, { useState, useEffect, useCallback } from "react";
import AddContact from "../AddContact/AddContact";
import Channels from "../Channels/Channels";
import Contacts from "../Contacts/Contacts";
import Feeds from "../Feeds/Feeds";
import getAdminChannelsAndFeeds from "../../utils/getAllChannelsAndFeeds";
import Messages from "../Messages/Messages";
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
  const {
    username,
    Role: { role }
  } = jwtDecode(token);
  const [channels, setChannels] = useState([]);
  const [channel, setChannel] = useState("");
  const [feeds, setFeeds] = useState();
  const [feed, setFeed] = useState("2");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const setFeedsAndChannels = useCallback(
    ({ data: { feeds, channels } }) => {
      setFeeds(feeds);
      setChannels(channels);
      setLoading(false);
    },
    [setFeeds, setChannels, setLoading]
  );
  const setAdminFeedsAndChannels = useCallback(
    ([channels, feeds]) => {
      setFeeds(feeds.data);
      setChannels(channels.data);
      setLoading(false);
    },
    [setFeeds, setChannels, setLoading]
  );
  const initializeDashboard = useCallback(
    !(role === "admin" || role === "manager") ? setFeedsAndChannels : null,
    [setFeedsAndChannels]
  );
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
    console.log("running");
    const token = localStorage.getItem("token");
    getUser(username, token);
  }, [getUser, username]);
  useEffect(() => {
    if (role === "admin" || role === "manager") {
      getAdminChannelsAndFeeds(token, setAdminFeedsAndChannels);
    }
  }, [role, token, setAdminFeedsAndChannels]);
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
        {(role === "admin" || role === "manager") && (
          <Feeds feeds={feeds} setFeed={setFeed} feed={feed} />
        )}
      </Menu>
      <Router primary={false}>
        <Channels
          path="/"
          channels={channels.filter(
            channel => channel.FeedId.toString() === feed
          )}
          feed={
            feeds &&
            feeds[feed - 1].name.charAt(0).toUpperCase() +
              feeds[feed - 1].name.substring(1)
          }
          setChannel={setChannel}
        />
        <Messages
          path="/:channelId/messages/"
          channel={channel}
          setLoading={setLoading}
          loading={loading}
          success={success}
          setSuccess={setSuccess}
        />
        <AddMessage
          path="/add-message/:channelId/"
          channel={channel}
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
