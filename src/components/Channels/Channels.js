import React from "react";
import { List, Header } from "semantic-ui-react";

import ContentSelector from "./ContentSelector/ContentSelector";
import "./Channels.css";

const Channels = ({ channels, feed, feedsMenu }) => {
  return (
    <div className="channels">
      <div className="page-header channels-header">
        <Header as="h3">Channels for {feed}</Header>
        {feedsMenu}
      </div>
      <List divided relaxed size="medium" verticalAlign="middle">
        {channels &&
          channels.map(channel => (
            <List.Item key={channel.name}>
              <List.Content verticalAlign="middle">{channel.name}</List.Content>
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
