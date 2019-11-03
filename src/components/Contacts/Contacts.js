import React, { useEffect, useCallback, useState } from "react";
import { Container, Dimmer, Loader } from "semantic-ui-react";

import "./Contacts.css";

export const Contacts = ({ channelId }) => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const setContactsCallback = useCallback(
    ({ data }) => {
      data && setContacts(data.contacts);
      setLoading(false);
    },
    [setContacts]
  );
  const getContacts = useCallback(
    (channelId, token, signal) => {
      setLoading(true);
      fetch(
        `https://collaboracast.herokuapp.com/api/v1/contacts/${channelId}`,
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
    const controller = new AbortController();
    const signal = controller.signal;

    const token = localStorage.getItem("token");
    getContacts(channelId, token, signal);

    return cleanup => controller.abort();
  }, [getContacts, channelId]);
  return (
    <Container className="contacts">
      {loading && (
        <Dimmer active className="collaboradimmer">
          <Loader size="big">Loading</Loader>
        </Dimmer>
      )}
      <div>Contacts {JSON.stringify(contacts, null, 2)}</div>
    </Container>
  );
};

export default Contacts;
