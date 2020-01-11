import React from "react";
import { Label } from "semantic-ui-react";

const NotificationLabel = ({ value }) => (
  <Label
    color={value === "all" ? "red" : value === "priority" ? "orange" : "grey"}
  >
    {value || "none"}
  </Label>
);

export default NotificationLabel;
