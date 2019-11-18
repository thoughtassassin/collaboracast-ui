import React, { useEffect, useCallback, useState } from "react";
import {
  Header,
  Segment,
  Message as SemanticMessage,
  Button,
  Icon
} from "semantic-ui-react";
import { navigate } from "@reach/router";
import moment from "moment";

import urls from "../../constants/urls";
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
          <Button
            onClick={() => navigate(`/add-comment/${messageId}`)}
            size="small"
            color="green"
            floated="right"
          >
            Add Comment
          </Button>
          <Header as="h2" inverted>
            Message
          </Header>
          {success && (
            <SemanticMessage positive onDismiss={() => setSuccess(false)}>
              {success}
            </SemanticMessage>
          )}
          <div className="message">
            <Header as="h4" attached="top" inverted>
              <div className="comment-user">
                <Icon name="user circle" size="large" />
                {message.User.username}
              </div>
              <div className="comment-date">
                {moment(message.createdAt).format("MMM DD, YYYY")}
              </div>
            </Header>
            <Segment key={`content-index`} inverted color="blue" attached>
              <div>{message.content}</div>
            </Segment>
            <Segment key={`footer-index`} inverted color="blue" attached>
              <div>
                <Icon name="comments" size="large" />
                {message.Comments.length}
              </div>
            </Segment>
          </div>
          {message.Comments.length > 0 && (
            <div className="comments">
              <Header as="h3" inverted>
                Comments
              </Header>
              {message.Comments.map((comment, index) => (
                <div key={index} className="comments">
                  <Header as="h4" attached="top" inverted>
                    <div className="comment-user">
                      <Icon name="user circle" size="large" />
                      {comment.User.username}
                    </div>
                    <div className="comment-date">
                      {moment(comment.createdAt).format("MMM DD, YYYY")}
                    </div>
                  </Header>
                  <Segment key={`content-index`} attached inverted color="grey">
                    <div>{comment.content}</div>
                  </Segment>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Message;
