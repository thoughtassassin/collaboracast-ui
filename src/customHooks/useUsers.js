import { useEffect, useCallback, useState } from "react";
import urls from "../constants/urls";

function useUsers() {
  const [users, setUsers] = useState([]);

  const setUsersCallback = useCallback(
    ({ data }) => {
      setUsers(data);
    },
    [setUsers]
  );

  const getUsers = useCallback(
    token => {
      fetch(`${urls.base}/api/v1/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(setUsersCallback)
        .catch(e => {
          console.error(e);
        });
    },
    [setUsersCallback]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    getUsers(token);
  }, [getUsers]);

  return users;
}

export default useUsers;
