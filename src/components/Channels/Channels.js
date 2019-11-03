import React from "react";
import { List } from "semantic-ui-react";
import { Link } from "@reach/router";

const Channels = ({ channels, feed, setChannel }) => {
  return (
    <div>
      <h2>Channels for {feed}</h2>
      <List divided inverted relaxed size="massive">
        {channels &&
          channels.map(channel => (
            <List.Item key={channel.name}>
              <List.Content>
                <Link
                  to={`/${channel.id}/contacts`}
                  onClick={() => setChannel(channel.name)}
                >
                  {channel.name}
                </Link>
              </List.Content>
            </List.Item>
          ))}
      </List>
    </div>
  );
};

export default Channels;
