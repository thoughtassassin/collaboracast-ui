import React from "react";
import { List, Header } from "semantic-ui-react";
import { Link } from "@reach/router";

import PageHeader from "../PageHeader/PageHeader";
import useUsers from "../../customHooks/useUsers";
import "./UsersChannels.css";

const UsersChannels = ({ setLoading }) => {
  const users = useUsers(setLoading);
  return (
    <div className="users-channels">
      <PageHeader>
        <Header as="h3">Channels for Users</Header>
      </PageHeader>
      <List divided relaxed size="huge">
        {users &&
          users.map(user => (
            <List.Item key={user.id}>
              <List.Content>
                <Link to={`/messages-by-user/${user.id}`}>{user.username}</Link>
              </List.Content>
            </List.Item>
          ))}
      </List>
    </div>
  );
};

export default UsersChannels;
