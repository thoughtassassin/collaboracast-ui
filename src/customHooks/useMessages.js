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
    (page) => {
      const token = localStorage.getItem("token");

      fetch(`${url}?page=${page}&limit=10`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      })
        .then((response) => response.json())
        .then(setMessagesCallback)
        .catch((e) => {
          console.error(e);
        });
    },
    [setMessagesCallback, url]
  );

  useEffect(() => {
    getMessages(1);
  }, [getMessages]);

  return [messages, getMessages];
}

export default useMessages;
