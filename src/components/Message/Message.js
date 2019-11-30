import React, { useEffect, useCallback, useState } from "react";
import { Header, Message as SemanticMessage, Button } from "semantic-ui-react";
import { navigate } from "@reach/router";

import urls from "../../constants/urls";
import MessageCard from "../MessageCard/MessageCard";
import CommentCard from "../CommentCard/CommentCard";
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
          <div className="page-header">
            <Header as="h3">Message</Header>
            <Button
              onClick={() => navigate(`/add-comment/${messageId}`)}
              size="small"
              color="green"
            >
              Add Comment
            </Button>
          </div>
          {success && (
            <SemanticMessage positive onDismiss={() => setSuccess(false)}>
              {success}
            </SemanticMessage>
          )}
          <MessageCard
            id={message.id}
            username={message.User.username}
            content={message.content}
            createdAt={message.createdAt}
            commentCount={message.Comments.length}
          />
          {message.Comments.length > 0 && (
            <div className="comments">
              <Header as="h3">Comments</Header>
              {message.Comments.map((comment, index) => (
                <CommentCard
                  key={index}
                  username={comment.User.username}
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
