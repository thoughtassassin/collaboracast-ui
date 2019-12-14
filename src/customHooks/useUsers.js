import { useEffect, useCallback, useState } from "react";
import urls from "../constants/urls";

function useUsers(setLoading) {
  const [users, setUsers] = useState([]);

  const setUsersCallback = useCallback(
    ({ data }) => {
      setUsers(data);
      setLoading(false);
    },
    [setUsers, setLoading]
  );

  const getUsers = useCallback(
    token => {
      setLoading(true);
      fetch(`${urls.base}/api/v1/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(setUsersCallback)
        .catch(e => {
          setLoading(false);
          console.error(e);
        });
    },
    [setUsersCallback, setLoading]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    getUsers(token);
  }, [getUsers]);

  return users;
}

export default useUsers;
