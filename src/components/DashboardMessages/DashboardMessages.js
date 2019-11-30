import React, { useEffect, useCallback, useState } from "react";
import { Header, Message, Button } from "semantic-ui-react";
import { navigate } from "@reach/router";

import urls from "../../constants/urls";
import MessageCard from "../MessageCard/MessageCard";

export const DashboardMessages = ({
  channels,
  setLoading,
  success,
  setSuccess,
  username
}) => {
  const [messages, setMessages] = useState([]);
  const setMessagesCallback = useCallback(
    json => {
      setMessages(json.data);
      setLoading(false);
    },
    [setMessages, setLoading]
  );
  const getMessages = useCallback(
    token => {
      setLoading(true);
      return fetch(`${urls.base}/api/v1/user-messages/${username}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        }
      })
        .then(responses => responses.json())
        .then(setMessagesCallback)
        .catch(e => {
          setLoading(false);
          console.error(e);
        });
    },
    [setMessagesCallback, setLoading, username]
  );
  useEffect(() => {
    const token = localStorage.getItem("token");
    channels.length > 0 && getMessages(token);
  }, [getMessages, channels]);
  return (
    <div className="messages">
      <>
        <div className="page-header">
          <Header as="h3">Dashboard</Header>
          <Button
            onClick={() => navigate(`/add-message/`)}
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
        {messages &&
          messages.map((message, index) => (
            <MessageCard
              key={index}
              id={message.id}
              username={message.username}
              content={message.content}
              createdAt={message.createdAt}
              commentCount={message.CommentCount}
            />
          ))}
      </>
    </div>
  );
};

export default DashboardMessages;
