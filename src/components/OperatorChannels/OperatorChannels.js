import React from "react";
import { List, Header } from "semantic-ui-react";
import { Link } from "@reach/router";

import PageHeader from "../PageHeader/PageHeader";
import "./OperatorChannels.css";

const UsersChannels = ({ channels }) => {
  return (
    <div className="operators-channels">
      <PageHeader>
        <Header as="h3">Channels for Operators</Header>
      </PageHeader>
      <List divided relaxed size="huge">
        {channels &&
          channels.map(channel => (
            <List.Item key={channel.id}>
              <List.Content>
                <Link to={`/channel-messages/${channel.id}`}>
                  {channel.name}
                </Link>
              </List.Content>
            </List.Item>
          ))}
      </List>
    </div>
  );
};

export default UsersChannels;
