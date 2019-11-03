import React, { useState, useEffect, useCallback } from "react";
import Feeds from "../Feeds/Feeds";
import Channels from "../Channels/Channels";
import { Router, Link, navigate } from "@reach/router";
import jwtDecode from "jwt-decode";
import {
  Container,
  Header,
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
  const [feeds, setFeeds] = useState();
  const [feed, setFeed] = useState("2");
  const [loading, setLoading] = useState(false);
  const setFeedsAndChannels = useCallback(
    ({ data: { feeds, channels } }) => {
      setFeeds(feeds);
      setChannels(channels);
      console.log(channels);
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
  return (
    <Container className="dashboard">
      {loading ? (
        <Dimmer active>
          <Loader size="big">Loading</Loader>
        </Dimmer>
      ) : (
        <>
          <Menu fixed="top" inverted color="blue">
            <Menu.Item as="h3" header>
              <Icon name="user" /> {username}
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
            />
          </Router>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
