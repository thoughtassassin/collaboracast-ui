import React from "react";
import { List, Header } from "semantic-ui-react";
import { Link } from "@reach/router";

import PageHeader from "../PageHeader/PageHeader";
import "./ItemsList.css";

const ItemsList = ({ listItems, header, resource, displayValue }) => {
  return (
    <div className="items-list">
      <PageHeader>
        <Header as="h3">List for {header}</Header>
      </PageHeader>
      <List divided relaxed size="huge">
        {listItems &&
          listItems.map(listItem => (
            <List.Item key={listItem.id}>
              <List.Content>
                <Link to={`/${resource}/${listItem.id}`}>
                  {listItem[displayValue]}
                </Link>
              </List.Content>
            </List.Item>
          ))}
      </List>
    </div>
  );
};

export default ItemsList;
