import React from "react";
import { List, Header } from "semantic-ui-react";
import { Link } from "@reach/router";

import PageHeader from "../PageHeader/PageHeader";
import "./ContactChannels.css";

const ChannelFilter = ({ channels, listType }) => {
  return (
    <div className="contact-channels">
      <PageHeader>
        <Header as="h3">Channels</Header>
      </PageHeader>
      <List divided relaxed size="medium">
        {channels &&
          channels.map(channel => (
            <List.Item key={channel.name}>
              <List.Content>
                <Link to={`/${channel.id}/${listType}`}>{channel.name}</Link>
              </List.Content>
            </List.Item>
          ))}
      </List>
    </div>
  );
};

export default ChannelFilter;
