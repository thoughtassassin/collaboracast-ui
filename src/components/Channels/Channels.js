import React from "react";
import { List } from "semantic-ui-react";

import ContentSelector from "./ContentSelector/ContentSelector";
import "./Channels.css";

const Channels = ({ channels, feed, feedsMenu }) => {
  return (
    <div className="channels">
      <div className="channels-header">
        <h2>Channels for {feed}</h2>
        {feedsMenu}
      </div>
      <List divided inverted relaxed size="large">
        {channels &&
          channels.map(channel => (
            <List.Item key={channel.name}>
              <List.Content>
                {channel.name}
                <ContentSelector channelId={channel.id} />
              </List.Content>
            </List.Item>
          ))}
      </List>
    </div>
  );
};

export default Channels;
