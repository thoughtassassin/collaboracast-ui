import React, { useState, useEffect, useCallback } from "react";
import Feeds from "../Feeds/Feeds";
import Channels from "../Channels/Channels";
import Contacts from "../Contacts/Contacts";
import { Router, Link } from "@reach/router";
import jwtDecode from "jwt-decode";
import {
  Button,
  Container,
  Dimmer,
  Loader,
  Menu,
  Icon
} from "semantic-ui-react";

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
  const setFeedsAndChannels = useCallback(
    ({ data: { feeds, channels } }) => {
      setFeeds(feeds);
      setChannels(channels);
      setLoading(false);
    },
    [setFeeds, setChannels]
  );
  const getUser = useCallback(
    (username, token) => {
      setLoading(true);
      fetch(`https://collaboracast.herokuapp.com/api/v1/users/${username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(setFeedsAndChannels)
        .catch(e => {
          setLoading(false);
          console.error(e);
        });
    },
    [setFeedsAndChannels]
  );
  useEffect(() => {
    console.log("running");
    const token = localStorage.getItem("token");
    getUser(username, token);
  }, [getUser, username]);
  const logout = () => {
    localStorage.removeItem("token");
    window.location.assign("/");
  };
  return (
    <Container className="dashboard">
      {loading && (
        <Dimmer active className="collaboradimmer">
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
      <Router>
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
        <Contacts path="/:channelId/contacts/" channel={channel} />
      </Router>
    </Container>
  );
};

export default Dashboard;
