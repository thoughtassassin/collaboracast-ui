import { useEffect, useCallback, useState } from "react";

function useMessages(url, setLoading) {
  const [messages, setMessages] = useState([]);

  const setMessagesCallback = useCallback(
    ({ data }) => {
      setMessages(data);
      setLoading(false);
    },
    [setMessages, setLoading]
  );

  const getMessages = useCallback(
    token => {
      setLoading(true);
      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(setMessagesCallback)
        .catch(e => {
          setLoading(false);
          console.error(e);
        });
    },
    [setMessagesCallback, setLoading, url]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    getMessages(token);
  }, [getMessages]);

  return messages;
}

export default useMessages;
