import React from "react";
import { Header } from "semantic-ui-react";
import ItemsList from "../ItemsList/ItemsList";
import PageHeader from "../PageHeader/PageHeader";
import useChannelUsers from "../../customHooks/useChannelUsers";

const ChannelUsers = ({ channelId }) => {
  const { users, name } = useChannelUsers(channelId);
  return users && users.length > 0 ? (
    <ItemsList
      listItems={users}
      header={`${name} Users`}
      displayValue="username"
    />
  ) : (
    <div>
      <PageHeader>
        <Header as="h1">List for {name} Users</Header>
      </PageHeader>
      <p>Users have not been assigned to {name}.</p>
    </div>
  );
};

export default ChannelUsers;
