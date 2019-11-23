import React, { useEffect, useCallback, useState } from "react";
import { Link } from "@reach/router";
import { Header, Segment, Message, Button, Icon } from "semantic-ui-react";
import { navigate } from "@reach/router";
import moment from "moment";

import urls from "../../constants/urls";
import "./DashboardMessages.css";

export const DashboardMessages = ({
  channels,
  loading,
  setLoading,
  success,
  setSuccess
}) => {
  const [messages, setMessages] = useState([]);
  const setMessagesCallback = useCallback(
    results => {
      const allMessages =
        results.length > 0 &&
        results.reduce((totalMessages, channelMessages) => {
          return (
            channelMessages.data &&
            totalMessages.concat([...channelMessages.data])
          );
        }, []);
      allMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setMessages(allMessages);
      setLoading(false);
    },
    [setMessages, setLoading]
  );
  const getMessages = useCallback(
    (token, channels) => {
      !loading && setLoading(true);
      Promise.all(
        channels.map(channel => {
          return fetch(`${urls.base}/api/v1/channel-messages/${channel.id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${token}`
            }
          });
        })
      )
        .then(responses =>
          Promise.all(responses.map(response => response.json()))
        )
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
    channels.length > 0 && getMessages(token, channels);
  }, [getMessages, channels]);
  return (
    <div className="messages">
      <>
        <Button
          onClick={() => navigate(`/add-message/`)}
          size="small"
          color="green"
          floated="right"
        >
          Add Message
        </Button>
        <Header as="h2" inverted>
          Dashboard
        </Header>
        {success && (
          <Message positive onDismiss={() => setSuccess(false)}>
            {success}
          </Message>
        )}
        {messages &&
          messages.map((message, index) => (
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
                    {message.Comments.length}
                  </div>
                </Segment>
              </Link>
            </div>
          ))}
      </>
    </div>
  );
};

export default DashboardMessages;
