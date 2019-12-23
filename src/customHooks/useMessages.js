import { useEffect, useCallback, useState } from "react";

function useMessages(url) {
  const [messages, setMessages] = useState([]);

  const setMessagesCallback = useCallback(
    ({ data }) => {
      setMessages(data);
    },
    [setMessages]
  );

  const getMessages = useCallback(
    token => {
      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(setMessagesCallback)
        .catch(e => {
          console.error(e);
        });
    },
    [setMessagesCallback, url]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    getMessages(token);
  }, [getMessages]);

  return messages;
}

export default useMessages;
