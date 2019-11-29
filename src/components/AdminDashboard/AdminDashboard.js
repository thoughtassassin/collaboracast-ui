import React, { useState, useEffect, useCallback } from "react";
import AddContact from "../AddContact/AddContact";
import Channels from "../Channels/Channels";
import Contacts from "../Contacts/Contacts";
import DashboardContainer from "../DashboardContainer/DashboadContainer";
import Feeds from "../Feeds/Feeds";
import getAdminChannelsAndFeeds from "../../utils/getAllChannelsAndFeeds";
import Messages from "../Messages/Messages";
import AddMessage from "../AddMessage/AddMessage";
import Message from "../Message/Message";
import AddComment from "../AddComment/AddComment";

import { Router } from "@reach/router";

const AdminDashboard = ({ setAuthenticated }) => {
  const token = localStorage.getItem("token");
  const [channels, setChannels] = useState([]);
  const [feeds, setFeeds] = useState();
  const [feed, setFeed] = useState("2");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const setAdminFeedsAndChannels = useCallback(
    ([channels, feeds]) => {
      setFeeds(feeds.data);
      setChannels(channels.data);
      setLoading(false);
    },
    [setFeeds, setChannels, setLoading]
  );

  useEffect(() => {
    console.log("admin");
    setLoading(true);
    getAdminChannelsAndFeeds(token, setAdminFeedsAndChannels);
  }, [token, setAdminFeedsAndChannels, setLoading]);

  const feedsMenu = <Feeds feeds={feeds} setFeed={setFeed} feed={feed} />;

  return (
    <DashboardContainer setAuthenticated={setAuthenticated} loading={loading}>
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
          feedsMenu={feedsMenu}
        />
        <Messages
          path="/:channelId/messages/"
          channels={channels}
          setLoading={setLoading}
          loading={loading}
          success={success}
          setSuccess={setSuccess}
        />
        <AddMessage
          path="/add-message/:channelId/"
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
          setLoading={setLoading}
          success={success}
          setSuccess={setSuccess}
          loading={loading}
          channels={channels}
        />
        <AddContact
          path="/add-contact/:channelId"
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

export default AdminDashboard;
