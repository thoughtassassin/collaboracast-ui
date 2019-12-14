import { useEffect, useCallback, useState } from "react";
import urls from "../constants/urls";

function useMessagesByChannel(channelId, setLoading) {
  const [messages, setMessages] = useState([]);

  const setMessagesCallback = useCallback(
    ({ data }) => {
      setMessages(data);
      setLoading(false);
    },
    [setMessages, setLoading]
  );

  const getMessages = useCallback(
    (channelId, token) => {
      setLoading(true);
      fetch(`${urls.base}/api/v1/channel-messages/${channelId}`, {
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
    getMessages(channelId, token);
  }, [getMessages, channelId]);

  return messages;
}

export default useMessagesByChannel;
