import React from "react";
import { Button } from "semantic-ui-react";

const Feeds = ({ feeds, setFeed, feed }) => (
  <div>
    <Button.Group
      inverted
      color="green"
      size="tiny"
      style={{ marginLeft: "1rem" }}
    >
      {feeds &&
        feeds.map(feedItem => (
          <Button
            key={feedItem.id}
            active={feed.toString() === feedItem.id.toString()}
            onClick={() => {
              setFeed(feedItem.id.toString());
            }}
          >
            {feedItem.name}
          </Button>
        ))}
    </Button.Group>
  </div>
);

export default Feeds;
