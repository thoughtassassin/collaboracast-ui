import { useEffect, useCallback, useState } from "react";
import urls from "../constants/urls";

function useMessagesByUser(userId, setLoading) {
  const [messages, setMessages] = useState([]);

  const setMessagesCallback = useCallback(
    ({ data }) => {
      setMessages(data);
      setLoading(false);
    },
    [setMessages, setLoading]
  );

  const getMessages = useCallback(
    (userId, token) => {
      setLoading(true);
      fetch(`${urls.base}/api/v1/messages-by-user/${userId}`, {
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
    [setMessagesCallback, setLoading]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    getMessages(userId, token);
  }, [getMessages, userId]);

  return messages;
}

export default useMessagesByUser;
