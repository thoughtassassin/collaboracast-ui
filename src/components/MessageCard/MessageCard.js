import React from "react";
import { Link } from "@reach/router";
import { Header, Segment, Icon } from "semantic-ui-react";
import moment from "moment";

import "./MessageCard.css";

export const MessageCard = ({
  id,
  username,
  warehouse,
  channel,
  content,
  createdAt,
  commentCount,
  interaction
}) => {
  const getIcon = interaction => {
    if (interaction === "call") {
      return "phone";
    }
    if (interaction === "email") {
      return "mail";
    }
    if (interaction === "in-person") {
      return "user";
    }
  };
  return (
    <div className="message">
      <Link to={`/messages/${id}`}>
        <Segment attached basic>
          <Header as="h4" attached="top">
            <div className="comment-user">
              {channel}{" "}
              {interaction && (
                <Icon
                  className="interaction-icon"
                  name={getIcon(interaction)}
                  aria-label={interaction}
                />
              )}
            </div>
            <div className="comment-date">
              {moment(createdAt).format("MMM DD, YYYY")}
              <br />
              {moment(createdAt).format("h:mm a")}
            </div>
          </Header>
        </Segment>
        <Segment key={`content-index`} attached basic>
          <div className="message-content">{content}</div>
        </Segment>
        <Segment key={`footer-index`} attached basic className="message-footer">
          <div>
            <Icon name="comments" size="large" />
            {commentCount || 0}
          </div>
          <div>
            <div>{username}</div>
            <div>{warehouse}</div>
          </div>
        </Segment>
      </Link>
    </div>
  );
};

export default MessageCard;
