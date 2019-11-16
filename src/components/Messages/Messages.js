import React, { useEffect, useCallback, useState } from "react";
import { Header, Segment, Button, Icon } from "semantic-ui-react";
import { navigate } from "@reach/router";

import urls from "../../constants/urls";
import "./Messages.css";
import { userInfo } from "os";

export const Messages = ({ channelId, channel, setLoading }) => {
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
          {messages.map((message, index) => (
            <div key={index} className="messages">
              <Header as="h4" attached="top" color="blue" inverted>
                <Icon name="user circle" size="mini" />
                {message.User.username}
              </Header>
              <Segment key={index} inverted color="blue" attached>
                <div>{message.content}</div>
              </Segment>
              <Segment key={index} inverted color="blue" attached>
                <div>
                  <Icon name="comments" size="large" />
                  {message.Comments.length}
                </div>
              </Segment>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Messages;
