import React from "react";
import { List, Icon } from "semantic-ui-react";

const Channels = ({ channels }) => {
  return (
    <div>
      <h2>Channels</h2>
      <List divided inverted relaxed size="massive">
        {channels &&
          channels.map(channel => (
            <List.Item key={channel.name}>
              <List.Content>{channel.name}</List.Content>
            </List.Item>
          ))}
      </List>
    </div>
  );
};

export default Channels;
