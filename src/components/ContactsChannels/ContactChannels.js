import React from "react";
import { List, Header } from "semantic-ui-react";
import { Link } from "@reach/router";

import "./ContactChannels.css";

const ContactChannels = ({ channels, setChannel }) => {
  return (
    <div className="contact-channels">
      <div className="page-header">
        <Header as="h3">Channels for Contacts</Header>
      </div>
      <List divided relaxed size="medium">
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

export default ContactChannels;
