import React from "react";
import { Header, Segment, Icon } from "semantic-ui-react";

import "./ContactCard.css";

export const ContactCard = ({
  firstName,
  lastName,
  phone,
  group,
  position,
  address1,
  address2,
  city,
  state,
  zip,
  email
}) => (
  <div className="contact-card">
    <Header as="h4" attached="top">
      <Icon name="user circle" size="mini" floated="left" />
      {firstName} {lastName} | <a href={`tel:${phone}`}>{phone}</a>
    </Header>
    <Segment attached>
      <Header sub>{group}</Header>
      {position && <div>{position}</div>}
      <div>{address1}</div>
      <div>{address2}</div>
      <div>
        {city} {city && state ? "," : ""} {state} {zip}
      </div>
      <div>
        <a href={`mailto:${email}`}>{email}</a>
      </div>
    </Segment>
  </div>
);

export default ContactCard;
