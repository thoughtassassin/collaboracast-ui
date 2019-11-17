import React, { useEffect, useCallback, useState } from "react";
import { Link } from "@reach/router";
import { Header, Segment, Message, Button, Icon } from "semantic-ui-react";
import { navigate } from "@reach/router";
import moment from "moment";

import urls from "../../constants/urls";
import "./Messages.css";

export const Messages = ({
  channelId,
  channel,
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
          <Button
            onClick={() => navigate(`/add-message/${channelId}`)}
            size="small"
            color="green"
            floated="right"
          >
            Add Message
          </Button>
          <Header as="h2" inverted>
            Messages for {channel}
          </Header>
          {success && (
            <Message positive onDismiss={() => setSuccess(false)}>
              {success}
            </Message>
          )}
          {messages.map((message, index) => (
            <div key={index} className="message">
              <Link to={`/messages/${message.id}`}>
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
                    {message.comments}
                  </div>
                </Segment>
              </Link>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Messages;
