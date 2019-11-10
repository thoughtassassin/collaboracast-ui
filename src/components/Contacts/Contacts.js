import React, { useEffect, useCallback, useState } from "react";
import { Header, Segment, Button, Icon } from "semantic-ui-react";
import { navigate } from "@reach/router";

import "./Contacts.css";

export const Contacts = ({ channelId, channel, setLoading }) => {
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
          <Header as="h2" inverted>
            Contacts for {channel}
          </Header>
          {contacts.map((contact, index) => (
            <div key={index} className="contact">
              <Header as="h4" attached="top" inverted>
                <Icon name="user circle" size="mini" />
                {contact.firstName} {contact.lastName} |{" "}
                <a href={`tel:{contact.phone}`}>{contact.phone}</a>
              </Header>
              <Segment key={index} inverted color="blue" attached>
                <Header sub>{contact.business}</Header>
                <div>{contact.address1}</div>
                <div>{contact.address2}</div>
                <div>
                  {contact.city}, {contact.state} {contact.zip}
                </div>
                <div>
                  <a href={`mailto:{contact.email}`}>{contact.email}</a>
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
