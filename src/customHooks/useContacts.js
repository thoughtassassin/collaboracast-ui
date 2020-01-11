import { useEffect, useCallback, useState } from "react";
import urls from "../constants/urls";

function useContacts(channelId, setLoading) {
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

  return contacts;
}

export default useContacts;
