import React from "react";
import { Header, Segment } from "semantic-ui-react";
import moment from "moment";

import "./CommentCard.css";

export const CommentCard = ({ username, warehouse, createdAt, content }) => (
  <div className="comment-card">
    <Segment attached>
      <Header as="h4" attached="top">
        <div className="comment-user">
          <div>{username}</div>
          <div>{warehouse}</div>
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
