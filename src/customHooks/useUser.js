import { useEffect, useCallback, useState } from "react";
import urls from "../constants/urls";

function useUser(email) {
  const [user, setUser] = useState([]);

  const setUserCallback = useCallback(
    ({ data }) => {
      setUser(data);
    },
    [setUser]
  );

  const getUser = useCallback(
    token => {
      fetch(`${urls.base}/api/v1/users/${email}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(setUserCallback)
        .catch(e => {
          console.error(e);
        });
    },
    [setUserCallback, email]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    getUser(token);
  }, [getUser]);

  return user;
}

export default useUser;
