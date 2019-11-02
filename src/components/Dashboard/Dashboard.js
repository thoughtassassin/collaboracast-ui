import React, { useState, useEffect, useCallback } from "react";
import Feeds from "../Feeds/Feeds";
import Channels from "../Channels/Channels";
import { Router, Link, navigate } from "@reach/router";

import "./Dashboard.css";

const Dashboard = () => {
  const username = localStorage.getItem("username");
  const [channels, setChannels] = useState([]);
  const [feeds, setFeeds] = useState();
  const [feed, setFeed] = useState();
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
  const getFeed = feed => {
    setFeed(feed);
    navigate(`/channels/${feed}`);
  };
  return (
    <div className="dashboard">
      <h1>Welcome, {username}</h1>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          <Feeds feeds={feeds} setFeed={getFeed} />
          {feed && (
            <Router>
              <Channels
                path="/channels/:feedId"
                channels={channels.filter(
                  channel => channel.FeedId.toString() === feed
                )}
              />
            </Router>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
