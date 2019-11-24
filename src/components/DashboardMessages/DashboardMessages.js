import React, { useEffect, useCallback, useState } from "react";
import { Link } from "@reach/router";
import { Header, Segment, Message, Button, Icon } from "semantic-ui-react";
import { navigate } from "@reach/router";
import moment from "moment";

import urls from "../../constants/urls";
import "./DashboardMessages.css";

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
                    {message.username}
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
                    {message.CommentCount}
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
