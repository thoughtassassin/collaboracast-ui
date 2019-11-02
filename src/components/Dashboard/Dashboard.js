import React, { useState, useEffect } from "react";

const Dashboard = ({ user }) => {
  const [channels, setChannels] = useState();
  const [feeds, setFeeds] = useState();
  const setFeedsAndChannels = ({ data }) => {
    setFeeds(data.feeds);
    setChannels(data.channels);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://collaboracast.herokuapp.com/api/v1/users/4", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      }
    })
      .then(response => response.json())
      .then(setFeedsAndChannels);
  }, []);
  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <div>
        <label>
          Feeds
          <select>
            <option value="">Select Feed</option>
            {feeds &&
              feeds.map(feed => <option value={feed.id}>{feed.name}</option>)}
          </select>
        </label>
      </div>
      <label>
        Channels
        <select>
          <option value="">Select Channel</option>
          {channels &&
            channels.map(channel => (
              <option value={channel.id}>{channel.name}</option>
            ))}
        </select>
      </label>
    </div>
  );
};

export default Dashboard;
