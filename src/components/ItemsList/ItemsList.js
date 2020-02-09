import React from "react";
import { Header, List, Message } from "semantic-ui-react";
import { Link } from "@reach/router";

import PageHeader from "../PageHeader/PageHeader";
import "./ItemsList.css";

const ItemsList = ({
  listItems,
  header,
  resource,
  displayValue,
  success,
  setSuccess,
  calloutItem,
  calloutValue
}) => {
  if (calloutItem === "badge") {
  }
  return (
    <div className="items-list">
      <PageHeader>
        <Header as="h1">List for {header}</Header>
      </PageHeader>
      {success && (
        <Message positive onDismiss={() => setSuccess(false)}>
          {success}
        </Message>
      )}
      <List divided relaxed size="huge">
        {listItems &&
          listItems.map(listItem => (
            <List.Item key={`${listItem.id}-${header.toLowerCase()}`}>
              <List.Content>
                <Link to={`/${resource}/${listItem.id}`}>
                  <span className="item-name">{listItem[displayValue]}</span>
                  {calloutItem && (
                    <div className="callout">
                      {React.cloneElement(calloutItem, {
                        value: listItem[calloutValue]
                      })}
                    </div>
                  )}
                </Link>
              </List.Content>
            </List.Item>
          ))}
      </List>
    </div>
  );
};

export default ItemsList;
