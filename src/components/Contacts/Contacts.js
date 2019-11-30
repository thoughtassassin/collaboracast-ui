import React, { useEffect, useCallback, useState } from "react";
import { Header, Message, Segment, Button, Icon } from "semantic-ui-react";
import { navigate } from "@reach/router";

import urls from "../../constants/urls";
import ChannelName from "../ChannelName/ChannelName";
import "./Contacts.css";

export const Contacts = ({
  channelId,
  channel,
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
          <Button
            onClick={() => navigate(`/add-contact/${channelId}`)}
            size="small"
            color="green"
            floated="right"
          >
            Add Contact
          </Button>
          <Header as="h3" inverted>
            Contacts for{" "}
            <ChannelName
              channels={channels}
              resource={/[0-9]+.?(?=\/contacts\/?)/g}
            />
          </Header>
          {success && (
            <Message positive onDismiss={() => setSuccess(false)}>
              {success}
            </Message>
          )}
          {contacts.map((contact, index) => (
            <div key={index} className="contact">
              <Header as="h4" attached="top" inverted>
                <Icon name="user circle" size="mini" />
                {contact.firstName} {contact.lastName} |{" "}
                <a href={`tel:${contact.phone}`}>{contact.phone}</a>
              </Header>
              <Segment key={index} inverted color="blue" attached>
                <Header sub>{contact.group}</Header>
                {contact.position && <div>{contact.position}</div>}
                <div>{contact.address1}</div>
                <div>{contact.address2}</div>
                <div>
                  {contact.city}, {contact.state} {contact.zip}
                </div>
                <div>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </div>
              </Segment>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Contacts;
