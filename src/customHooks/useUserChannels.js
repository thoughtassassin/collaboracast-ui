import { useEffect, useCallback, useState } from "react";
import urls from "../constants/urls";

function useUserChannels(setLoading, email) {
  const [channels, setChannels] = useState([]);

  const setUserChannelsCallback = useCallback(
    ({ data: { channels } }) => {
      setChannels(channels);
      setLoading(false);
    },
    [setChannels, setLoading]
  );

  const getUser = useCallback(
    token => {
      setLoading(true);
      fetch(`${urls.base}/api/v1/users/${email}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(setUserChannelsCallback)
        .catch(e => {
          setLoading(false);
          console.error(e);
        });
    },
    [setUserChannelsCallback, setLoading, email]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    getUser(token);
  }, [getUser]);

  return channels;
}

export default useUserChannels;
