import React from "react";
import { Header, Message, Button } from "semantic-ui-react";
import { navigate } from "@reach/router";

import ChannelName from "../ChannelName/ChannelName";
import ContactCard from "../ContactCard/ContactCard";
import PageHeader from "../PageHeader/PageHeader";
import useContacts from "../../customHooks/useContacts";
import "./Contacts.css";

export const Contacts = ({
  channelId,
  setLoading,
  success,
  setSuccess,
  channels
}) => {
  const contacts = useContacts(channelId, setLoading);
  return (
    <div className="contacts">
      {contacts && (
        <>
          <PageHeader>
            <Header as="h1">
              Contacts for{" "}
              <ChannelName
                channels={channels}
                resource={/\/contacts\/([0-9]+).?\/?/}
              />
            </Header>
            <Button
              onClick={() => navigate(`/add-contact/${channelId}`)}
              size="small"
              primary
            >
              Add Contact
            </Button>
          </PageHeader>
          {success && (
            <Message positive onDismiss={() => setSuccess(false)}>
              {success}
            </Message>
          )}
          {contacts.map((contact, index) => (
            <ContactCard
              key={index}
              firstName={contact.firstName}
              lastName={contact.lastName}
              phone={contact.phone}
              group={contact.group}
              position={contact.position}
              address1={contact.address1}
              address2={contact.address2}
              city={contact.city}
              state={contact.state}
              zip={contact.zip}
              email={contact.email}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Contacts;
