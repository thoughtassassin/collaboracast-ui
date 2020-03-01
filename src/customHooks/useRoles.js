import { useEffect, useCallback, useState } from "react";
import urls from "../constants/urls";

function useRoles() {
  const [roles, setRoles] = useState(null);

  const setRolesCallback = useCallback(
    ({ data }) => {
      setRoles(data);
    },
    [setRoles]
  );

  const getRoles = useCallback(
    token => {
      fetch(`${urls.base}/api/v1/roles`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(setRolesCallback)
        .catch(e => {
          console.error(e);
        });
    },
    [setRolesCallback]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    getRoles(token);
  }, [getRoles]);

  return roles;
}

export default useRoles;
