import React from "react";
import { List } from "semantic-ui-react";

import ContentSelector from "./ContentSelector/ContentSelector";

const Channels = ({ channels, feed, setChannel, feedsMenu }) => {
  return (
    <div>
      {feedsMenu}
      <h2>Channels for {feed}</h2>
      <List divided inverted relaxed size="massive">
        {channels &&
          channels.map(channel => (
            <List.Item key={channel.name}>
              <List.Content onClick={() => setChannel(channel.name)}>
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
