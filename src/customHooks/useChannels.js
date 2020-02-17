import { useEffect, useCallback, useState } from "react";
import urls from "../constants/urls";

function useChannels(updateIncrement) {
  const [channels, setChannels] = useState(null);

  const setChannelsCallback = useCallback(
    ({ data }) => {
      setChannels(data);
    },
    [setChannels]
  );

  const getChannels = useCallback(
    token => {
      fetch(`${urls.base}/api/v1/channels`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(setChannelsCallback)
        .catch(e => {
          console.error(e);
        });
    },
    [setChannelsCallback]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    getChannels(token);
  }, [getChannels, updateIncrement]);

  return channels;
}

export default useChannels;
