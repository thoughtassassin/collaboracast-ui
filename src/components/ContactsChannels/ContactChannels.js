import React from "react";
import { List, Header } from "semantic-ui-react";
import { Link } from "@reach/router";

const Channels = ({ channels, setChannel }) => {
  return (
    <div>
      <Header as="h3" inverted>
        Channels for Contacts
      </Header>
      <List divided inverted relaxed size="medium">
        {channels &&
          channels.map(channel => (
            <List.Item key={channel.name}>
              <List.Content>
                <Link to={`/${channel.id}/contacts`}>{channel.name}</Link>
              </List.Content>
            </List.Item>
          ))}
      </List>
    </div>
  );
};

export default Channels;
