import React, { useState, useEffect } from "react";
import { Header, Message, Button } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroll-component";
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
  user,
}) => {
  const url = id ? `${fetchUrl}/${id}` : fetchUrl;
  const [messages, getMessages] = useMessages(url, setLoading);
  const [loadedMessages, setLoadedMessages] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoadedMessages((loadedMessages) => [...loadedMessages, ...messages]);
  }, [messages]);

  const loadMessages = () => {
    const newPage = page + 1;
    getMessages(newPage);
    setPage(newPage);
  };

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
          <InfiniteScroll
            dataLength={loadedMessages.length}
            next={loadMessages}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            {loadedMessages.map((message, index) =>
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
                  interaction={message.interaction}
                />
              ) : message.User ? (
                <MessageCard
                  key={index}
                  id={message.id}
                  username={message.User.username}
                  warehouse={message.User.Warehouse.name}
                  content={message.content}
                  createdAt={message.createdAt}
                  commentCount={message.Comments.length}
                  channel={message.Channel.name}
                  interaction={message.interaction}
                />
              ) : null
            )}
          </InfiniteScroll>
        </>
      )}
    </div>
  );
};

export default Messages;
