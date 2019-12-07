import React, { useEffect, useCallback, useState } from "react";
import { Header, Message, Button } from "semantic-ui-react";
import { navigate } from "@reach/router";

import urls from "../../constants/urls";
import ChannelName from "../ChannelName/ChannelName";
import MessageCard from "../MessageCard/MessageCard";
import PageHeader from "../PageHeader/PageHeader";
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
          <PageHeader>
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
              primary
            >
              Add Message
            </Button>
          </PageHeader>
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
              warehouse={message.User.Warehouse.name}
              content={message.content}
              createdAt={message.createdAt}
              commentCount={message.Comments.length}
              channel={message.Channel.name}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Messages;
