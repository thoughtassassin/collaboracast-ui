import React, { useEffect, useCallback, useState } from "react";
import {
  Container,
  Dimmer,
  Header,
  Loader,
  Segment,
  Button
} from "semantic-ui-react";
import { navigate } from "@reach/router";

import "./Contacts.css";

export const Contacts = ({ channelId, channel }) => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const setContactsCallback = useCallback(
    ({ data }) => {
      setContacts(data);
      setLoading(false);
    },
    [setContacts]
  );
  const getContacts = useCallback(
    (channelId, token) => {
      setLoading(true);
      fetch(
        `https://collaboracast.herokuapp.com/api/v1/contacts-channel/${channelId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`
          }
        }
      )
        .then(response => response.json())
        .then(setContactsCallback)
        .catch(e => {
          setLoading(false);
          console.error(e);
        });
    },
    [setContactsCallback]
  );
  useEffect(() => {
    const token = localStorage.getItem("token");
    getContacts(channelId, token);
  }, [getContacts, channelId]);
  return (
    <Container className="contacts">
      {loading && (
        <Dimmer active className="collaboradimmer">
          <Loader size="big">Loading</Loader>
        </Dimmer>
      )}
      {contacts && (
        <>
          <Header as="h2" inverted>
            Contacts for {channel}
            <Button
              onClick={() => navigate(`/add-contact/${channelId}`)}
              size="small"
              color="green"
            >
              Add Contact
            </Button>
          </Header>
          {contacts.map((contact, index) => (
            <Segment key={index} inverted color="blue">
              <Header as="h3">
                {contact.firstName} {contact.lastName} : {contact.phone}
              </Header>
              <div>{contact.address1}</div>
              <div>{contact.address2}</div>
              <div>
                {contact.city}, {contact.state} {contact.zip}
              </div>
            </Segment>
          ))}
        </>
      )}
    </Container>
  );
};

export default Contacts;
