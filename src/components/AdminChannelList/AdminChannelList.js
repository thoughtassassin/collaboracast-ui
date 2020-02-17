import React, { useState } from "react";
import AdminArchiveButton from "../AdminArchiveButton/AdminArchiveButton";
import { Button, Form, Message } from "semantic-ui-react";
import ItemsList from "../ItemsList/ItemsList";
import { navigate } from "@reach/router";
import useChannels from "../../customHooks/useChannels";
import useFilteredChannels from "../../customHooks/useFilteredChannels";

import "./AdminChannelList.css";

const AdminChannelList = ({ setLoading, setSuccess, success, token }) => {
  const [updateIncrement, setUpdateIncrement] = useState(0);
  const [error, setError] = useState(null);
  const channels = useChannels(updateIncrement);
  const [
    filteredChannels,
    searchTerm,
    handleChange,
    clearSearch
  ] = useFilteredChannels(channels);
  return (
    <div className="channels-list">
      <div className="add-button">
        <Button onClick={() => navigate("/add-channel")} size="small" primary>
          Add Channel
        </Button>
      </div>
      <Form>
        <Form.Group>
          <Form.Field>
            <Form.Input
              name="searchTerm"
              icon="search"
              placeholder="Filter Channels"
              onChange={handleChange}
            />
          </Form.Field>
        </Form.Group>
      </Form>
      {success && (
        <Message positive onDismiss={() => setSuccess(false)}>
          {success}
        </Message>
      )}
      {error && (
        <Message negative onDismiss={() => setError(null)}>
          {error}
        </Message>
      )}
      <ItemsList
        listItems={searchTerm ? filteredChannels : channels}
        header="Operators"
        displayValue="name"
        resource="operators"
        calloutItem={
          <AdminArchiveButton
            clearSearch={clearSearch}
            archiveUrl="/api/v1/channels"
            setUpdateIncrement={setUpdateIncrement}
            setError={setLoading}
            setLoading={setLoading}
            token={token}
          />
        }
        calloutValue="name"
      />
    </div>
  );
};

export default AdminChannelList;
