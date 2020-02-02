import React, { useState } from "react";
import { Form, Header, Message } from "semantic-ui-react";
import { Link } from "@reach/router";

import requestChannel from "../../utils/requestChannel";
import PageHeader from "../PageHeader/PageHeader";
import "./RequestChannel.css";
import useFilteredChannels from "../../customHooks/useFilteredChannels";
import useChannels from "../../customHooks/useChannels";

export const RequestChannels = ({
  loading,
  setLoading,
  success,
  setSuccess,
  token
}) => {
  const channels = useChannels();
  const [filteredChannels, searchTerm, handleChange] = useFilteredChannels(
    channels
  );
  const [error, setError] = useState(null);

  channels && channels.length > 0 ? setLoading(false) : setLoading(true);

  return (
    <div className="channel-requests">
      <PageHeader>
        <Header as="h1">Request Operators</Header>
      </PageHeader>
      <p>
        Type in the name of the operator you would like to request. If it
        doesn't exist you will be able to send a request to add the operator.
      </p>
      <p>
        If you see existing operators you can click on the operator to see which
        users are assigned to that operator.
      </p>
      {loading ? null : (
        <div>
          {success && (
            <Message positive onDismiss={() => setSuccess(false)}>
              {success}
            </Message>
          )}
          {error && (
            <Message negative onDismiss={() => setError(null)}>
              {JSON.stringify(error)}
            </Message>
          )}
          <Form>
            <Form.Group>
              <Form.Field>
                <Form.Input
                  name="searchTerm"
                  placeholder="Channel"
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Button
                primary
                type="button"
                content="Request Operator"
                onClick={async () => {
                  try {
                    const response = await requestChannel(searchTerm, token);
                    setSuccess(response.message);
                  } catch (e) {
                    setError(e.message);
                  }
                }}
                disabled={filteredChannels.length > 0 || searchTerm === ""}
              />
            </Form.Group>
          </Form>
          {filteredChannels.length > 0 && searchTerm !== "" && (
            <div className="channels-list">
              {filteredChannels.map(filteredChannel => (
                <div key={filteredChannel.name}>
                  <Link to={`/channel-users/${filteredChannel.id}`}>
                    {filteredChannel.name}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RequestChannels;
