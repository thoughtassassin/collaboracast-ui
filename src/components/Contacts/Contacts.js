import React, { useEffect, useCallback, useState } from "react";
import { Header, Message, Button } from "semantic-ui-react";
import { navigate } from "@reach/router";

import urls from "../../constants/urls";
import ChannelName from "../ChannelName/ChannelName";
import ContactCard from "../ContactCard/ContactCard";
import PageHeader from "../PageHeader/PageHeader";
import "./Contacts.css";

export const Contacts = ({
  channelId,
  setLoading,
  success,
  setSuccess,
  channels
}) => {
  const [contacts, setContacts] = useState([]);
  const setContactsCallback = useCallback(
    ({ data }) => {
      setContacts(data);
      setLoading(false);
    },
    [setContacts, setLoading]
  );
  const getContacts = useCallback(
    (channelId, token) => {
      setLoading(true);
      fetch(`${urls.base}/api/v1/channel-contacts/${channelId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(setContactsCallback)
        .catch(e => {
          setLoading(false);
          console.error(e);
        });
    },
    [setContactsCallback, setLoading]
  );
  useEffect(() => {
    const token = localStorage.getItem("token");
    getContacts(channelId, token);
  }, [getContacts, channelId]);
  return (
    <div className="contacts">
      {contacts && (
        <>
          <PageHeader>
            <Header as="h3">
              Contacts for{" "}
              <ChannelName
                channels={channels}
                resource={/[0-9]+.?(?=\/contacts\/?)/g}
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
