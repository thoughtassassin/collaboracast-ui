import { useEffect, useCallback, useState } from "react";
import urls from "../constants/urls";

function useChannels(setLoading) {
  const [channels, setChannels] = useState([]);

  const setChannelsCallback = useCallback(
    ({ data }) => {
      setChannels(data);
      setLoading(false);
    },
    [setChannels, setLoading]
  );

  const getChannels = useCallback(
    token => {
      setLoading(true);
      fetch(`${urls.base}/api/v1/channels`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(setChannelsCallback)
        .catch(e => {
          setLoading(false);
          console.error(e);
        });
    },
    [setChannelsCallback, setLoading]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    getChannels(token);
  }, [getChannels]);

  return channels;
}

export default useChannels;
