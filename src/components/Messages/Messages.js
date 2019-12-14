import React from "react";
import { Header, Message, Button } from "semantic-ui-react";
import { navigate } from "@reach/router";

import MessageCard from "../MessageCard/MessageCard";
import PageHeader from "../PageHeader/PageHeader";
import useMessages from "../../customHooks/useMessages";
import urls from "../../constants/urls";
import "./Messages.css";

export const Messages = ({
  userId,
  channelId,
  setLoading,
  success,
  setSuccess
}) => {
  let url = `${urls.base}/api/v1/messages`;
  if (userId) {
    url = `${urls.base}/api/v1/messages-by-user/${userId}`;
  }
  if (channelId) {
    url = `${urls.base}/api/v1/channel-messages/${channelId}`;
  }
  const messages = useMessages(url, setLoading);

  return (
    <div className="messages">
      {messages && (
        <>
          <PageHeader>
            <Header as="h3">Messages</Header>
            <Button
              onClick={() =>
                channelId
                  ? navigate(`/add-message/${channelId}`)
                  : navigate(`/add-message`)
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
          {messages.map((message, index) => (
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
          ))}
        </>
      )}
    </div>
  );
};

export default Messages;
