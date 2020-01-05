import React, { useEffect, useCallback, useState } from "react";
import { Header, Message as SemanticMessage, Button } from "semantic-ui-react";
import { navigate } from "@reach/router";

import urls from "../../constants/urls";
import MessageCard from "../MessageCard/MessageCard";
import CommentCard from "../CommentCard/CommentCard";
import PageHeader from "../PageHeader/PageHeader";
import "./Message.css";

export const Message = ({
  messageId = "1",
  setLoading,
  success,
  setSuccess
}) => {
  const [message, setMessage] = useState();
  const setMessageCallback = useCallback(
    ({ data }) => {
      setMessage(data);
      setLoading(false);
    },
    [setMessage, setLoading]
  );
  const getMessage = useCallback(
    (messageId, token) => {
      setLoading(true);
      fetch(`${urls.base}/api/v1/messages/${messageId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(setMessageCallback)
        .catch(e => {
          setLoading(false);
          console.error(e);
        });
    },
    [setMessageCallback, setLoading]
  );
  useEffect(() => {
    const token = localStorage.getItem("token");
    getMessage(messageId, token);
  }, [getMessage, messageId]);
  return (
    <div className="messages">
      {message && (
        <>
          <PageHeader>
            <Header as="h1">Message</Header>
            <Button
              onClick={() => navigate(`/add-comment/${messageId}`)}
              size="small"
              primary
            >
              Add Comment
            </Button>
          </PageHeader>
          {success && (
            <SemanticMessage positive onDismiss={() => setSuccess(false)}>
              {success}
            </SemanticMessage>
          )}
          <MessageCard
            id={message.id}
            username={message.User.username}
            warehouse={message.User.Warehouse.name}
            content={message.content}
            createdAt={message.createdAt}
            commentCount={message.Comments.length}
            channel={message.Channel.name}
          />
          {message.Comments.length > 0 && (
            <div className="comments">
              <Header as="h1">Comments</Header>
              {message.Comments.map((comment, index) => (
                <CommentCard
                  key={index}
                  username={comment.User.username}
                  warehouse={comment.User.Warehouse.name}
                  createdAt={comment.createdAt}
                  content={comment.content}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Message;
