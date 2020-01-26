import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Header,
  Message as SemanticMessage
} from "semantic-ui-react";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";

import urls from "../../constants/urls";
import PageHeader from "../PageHeader/PageHeader";
import "./RequestChannel.css";
import useChannels from "../../customHooks/useChannels";

export const RequestChannels = ({ setLoading, loading, token }) => {
  const channels = useChannels();
  const [filteredChannels, setFilteredChannels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  channels && channels.length > 0 ? setLoading(false) : setLoading(true);

  const handleChange = ({ target: { value } }) => {
    if (value !== "") {
      setFilteredChannels(
        channels.filter(channel =>
          channel.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredChannels([]);
    }
    setSearchTerm(value);
  };

  console.log("term", searchTerm === "");

  return (
    <div className="channel-requests">
      <PageHeader>
        <Header as="h1">Request Channels</Header>
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
                onClick={() => ""}
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
