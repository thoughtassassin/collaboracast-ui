import { useEffect, useCallback, useState } from "react";
import urls from "../constants/urls";

function useUserMessages(email, setLoading) {
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
      return fetch(`${urls.base}/api/v1/user-messages/${email}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        }
      })
        .then(responses => responses.json())
        .then(setMessagesCallback)
        .catch(e => {
          setLoading(false);
          console.error(e);
        });
    },
    [setMessagesCallback, setLoading, email]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    getMessages(token);
  }, [getMessages, channels]);

  return messages;
}

export default useUserMessages;
