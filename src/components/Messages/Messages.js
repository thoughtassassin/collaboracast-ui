import React from "react";
import { Header, Message, Button } from "semantic-ui-react";
import { navigate } from "@reach/router";

import MessageCard from "../MessageCard/MessageCard";
import PageHeader from "../PageHeader/PageHeader";
import useMessages from "../../customHooks/useMessages";
import "./Messages.css";

export const Messages = ({
  id,
  setLoading,
  success,
  setSuccess,
  fetchUrl,
  successUrl,
  selectMessageTopic,
  user
}) => {
  const url = id ? `${fetchUrl}/${id}` : fetchUrl;
  const messages = useMessages(url, setLoading);
  return (
    <div className="messages">
      {messages && (
        <>
          <PageHeader>
            <Header as="h1">Messages</Header>
            <Button
              onClick={() =>
                navigate(
                  selectMessageTopic ? `${successUrl}/${id}` : successUrl
                )
              }
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
          {messages.map((message, index) =>
            user ? (
              <MessageCard
                key={index}
                id={message.id}
                username={message.username}
                warehouse={message.warehouseName}
                content={message.content}
                createdAt={message.createdAt}
                commentCount={message.CommentCount}
                channel={message.channelName}
              />
            ) : (
              <MessageCard
                key={index}
                id={message.id}
                username={message.User.username}
                warehouse={message.User.Warehouse.name}
                content={message.content}
                createdAt={message.createdAt}
                commentCount={message.Comments.length}
                channel={message.Channel.name}
              />
            )
          )}
        </>
      )}
    </div>
  );
};

export default Messages;
