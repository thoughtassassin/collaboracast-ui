import React from "react";
import { Button } from "semantic-ui-react";
import { navigate } from "@reach/router";

const ContentSelector = ({ channelId }) => (
  <>
    <Button.Group
      size="mini"
      inverted
      vertical
      color="blue"
      style={{ marginLeft: "1rem" }}
    >
      <Button
        onClick={() => {
          navigate(`${channelId}/messages`);
        }}
      >
        Messages
      </Button>
      <Button
        onClick={() => {
          navigate(`${channelId}/contacts`);
        }}
      >
        Contacts
      </Button>
    </Button.Group>
  </>
);

export default ContentSelector;
