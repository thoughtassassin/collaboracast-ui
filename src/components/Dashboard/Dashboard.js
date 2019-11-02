import React, { useState, useEffect, useCallback } from "react";

const Dashboard = ({ user }) => {
  const [channels, setChannels] = useState();
  const [feeds, setFeeds] = useState();
  const setFeedsAndChannels = useCallback(
    ({ data: { feeds, channels } }) => {
      setFeeds(feeds);
      setChannels(channels);
    },
    [setFeeds, setChannels]
  );
  const getUser = useCallback(
    (username, token) => {
      fetch(`https://collaboracast.herokuapp.com/api/v1/users/${username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(setFeedsAndChannels);
    },
    [setFeedsAndChannels]
  );
  useEffect(() => {
    console.log("running");
    const token = localStorage.getItem("token");
    getUser(user.username, token);
  }, [getUser, user.username]);
  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <div>
        <label>
          Feeds
          <select>
            <option value="">Select Feed</option>
            {feeds &&
              feeds.map(feed => (
                <option key={feed.id} value={feed.id}>
                  {feed.name}
                </option>
              ))}
          </select>
        </label>
      </div>
      <label>
        Channels
        <select>
          <option value="">Select Channel</option>
          {channels &&
            channels.map(channel => (
              <option key={channel.id} value={channel.id}>
                {channel.name}
              </option>
            ))}
        </select>
      </label>
    </div>
  );
};

export default Dashboard;
