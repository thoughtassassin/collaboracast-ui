import React from "react";
import { Menu } from "semantic-ui-react";

const Feeds = ({ feeds, setFeed, feed }) => (
  <Menu compact inverted color="green" floated="right">
    {feeds &&
      feeds.map(feedItem => (
        <Menu.Item
          key={feedItem.id}
          active={feed.toString() === feedItem.id.toString()}
          name={feedItem.name}
          onClick={() => setFeed(feedItem.id.toString())}
        />
      ))}
  </Menu>
);

export default Feeds;
