import React from "react";
import { Header, Segment, Icon } from "semantic-ui-react";
import moment from "moment";

import "./CommentCard.css";

export const CommentCard = ({ username, createdAt, content }) => (
  <div className="comment-card">
    <Segment attached>
      <Header as="h4" attached="top">
        <div className="comment-user">
          <Icon name="user circle" size="large" />
          {username}
        </div>
        <div className="comment-date">
          {moment(createdAt).format("MMM DD, YYYY")}
        </div>
      </Header>
    </Segment>
    <Segment key={`content-index`} attached>
      <div className="content">{content}</div>
    </Segment>
  </div>
);

export default CommentCard;
