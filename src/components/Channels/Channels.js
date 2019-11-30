import React from "react";
import { List, Header } from "semantic-ui-react";

import ContentSelector from "./ContentSelector/ContentSelector";
import "./Channels.css";

const Channels = ({ channels, feed, feedsMenu }) => {
  return (
    <div className="channels">
      <div className="channels-header">
        <Header as="h3" inverted>
          Channels for {feed}
        </Header>
        {feedsMenu}
      </div>
      <List divided inverted relaxed size="medium" verticalAlign="middle">
        {channels &&
          channels.map(channel => (
            <List.Item key={channel.name}>
              <List.Content verticalAlign="middle">
                <h3>{channel.name}</h3>
              </List.Content>
              <List.Content>
                <ContentSelector channelId={channel.id} />
              </List.Content>
            </List.Item>
          ))}
      </List>
    </div>
  );
};

export default Channels;
