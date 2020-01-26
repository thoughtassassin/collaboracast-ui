import { useEffect, useCallback, useState } from "react";
import urls from "../constants/urls";

function useChannelUsers(channelId) {
  console.log("from useChannelUsers: ", channelId);
  const [channelUsers, setChannelUsers] = useState([]);

  const setChannelUsersCallback = useCallback(
    ({ data }) => {
      console.log("channelUsers data: ", data);
      setChannelUsers(data);
    },
    [setChannelUsers]
  );

  const getChannelUsers = useCallback(
    token => {
      console.log(`${urls.base}/api/v1/channel-users/${channelId}`);
      fetch(`${urls.base}/api/v1/channel-users/${channelId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(setChannelUsersCallback)
        .catch(e => {
          console.error(e);
        });
    },
    [setChannelUsersCallback]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    getChannelUsers(token);
  }, [getChannelUsers]);

  return channelUsers;
}

export default useChannelUsers;
