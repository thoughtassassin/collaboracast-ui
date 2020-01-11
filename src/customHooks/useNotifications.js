import { useEffect, useCallback, useState } from "react";
import urls from "../constants/urls";

function useNotifications(type, user, update) {
  const [notifications, setNotifications] = useState([]);

  const setNotificationsCallback = useCallback(
    ({ data }) => {
      setNotifications(data);
    },
    [setNotifications]
  );

  const getNotifications = useCallback(
    token => {
      fetch(`${urls.base}/api/v1/notifications/${type}/${user}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(setNotificationsCallback)
        .catch(e => {
          console.error(e);
        });
    },
    [setNotificationsCallback, type, user]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    getNotifications(token, type, user);
  }, [getNotifications, type, user, update]);

  return notifications;
}

export default useNotifications;
