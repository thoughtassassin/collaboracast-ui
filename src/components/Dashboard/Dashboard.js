import React, { useState, useEffect, useCallback } from "react";
import Feeds from "../Feeds/Feeds";
import Channels from "../Channels/Channels";
import { Router, Link, navigate } from "@reach/router";
import jwtDecode from "jwt-decode";

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
    <div className="dashboard">
      <h1>Welcome, {username}</h1>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          {(role === "admin" || role === "manager") && (
            <Feeds feeds={feeds} setFeed={setFeed} />
          )}
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
    </div>
  );
};

export default Dashboard;
