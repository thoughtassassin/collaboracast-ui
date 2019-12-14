import React from "react";
import { List, Header } from "semantic-ui-react";
import { Link } from "@reach/router";

import PageHeader from "../PageHeader/PageHeader";
import "./ContactChannels.css";

const ContactChannels = ({ channels }) => {
  return (
    <div className="contact-channels">
      <PageHeader>
        <Header as="h3">Channels for Contacts</Header>
      </PageHeader>
      <List divided relaxed size="huge">
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
