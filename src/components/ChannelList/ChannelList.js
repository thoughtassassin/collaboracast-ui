import React from "react";
import { Form } from "semantic-ui-react";
import ItemsList from "../ItemsList/ItemsList";
import useFilteredChannels from "../../customHooks/useFilteredChannels";

import "./ChannelList.css";

const ChannelList = ({ channels }) => {
  const [filteredChannels, searchTerm, handleChange] = useFilteredChannels(
    channels
  );
  return (
    <div className="channels-list">
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
      <ItemsList
        listItems={searchTerm ? filteredChannels : channels}
        header="Operators"
        displayValue="name"
        resource="operators"
      />
    </div>
  );
};

export default ChannelList;
