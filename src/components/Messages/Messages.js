import React, { useEffect, useCallback, useState } from "react";
import { Header, Message, Button } from "semantic-ui-react";
import { navigate } from "@reach/router";

import urls from "../../constants/urls";
import ChannelName from "../ChannelName/ChannelName";
import MessageCard from "../MessageCard/MessageCard";
import "./Messages.css";

export const Messages = ({
  channelId,
  channels,
  setLoading,
  success,
  setSuccess
}) => {
  const [messages, setMessages] = useState([]);
  const setMessagesCallback = useCallback(
    ({ data }) => {
      setMessages(data);
      setLoading(false);
    },
    [setMessages, setLoading]
  );
  const getMessages = useCallback(
    (channelId, token) => {
      setLoading(true);
      fetch(`${urls.base}/api/v1/channel-messages/${channelId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(setMessagesCallback)
        .catch(e => {
          setLoading(false);
          console.error(e);
        });
    },
    [setMessagesCallback, setLoading]
  );
  useEffect(() => {
    const token = localStorage.getItem("token");
    getMessages(channelId, token);
  }, [getMessages, channelId]);
  return (
    <div className="messages">
      {messages && (
        <>
          <div className="page-header">
            <Header as="h3">
              Messages for{" "}
              <ChannelName
                channels={channels}
                resource={/[0-9]+.?(?=\/messages\/?)/g}
              />
            </Header>
            <Button
              onClick={() => navigate(`/add-message/${channelId}`)}
              size="small"
              color="green"
            >
              Add Message
            </Button>
          </div>
          {success && (
            <Message positive onDismiss={() => setSuccess(false)}>
              {success}
            </Message>
          )}
          {messages.map((message, index) => (
            <MessageCard
              key={index}
              id={message.id}
              username={message.username}
              content={message.content}
              createdAt={message.createdAt}
              commentCount={message.Comments.length}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Messages;
