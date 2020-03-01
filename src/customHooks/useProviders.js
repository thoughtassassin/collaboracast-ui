import { useEffect, useCallback, useState } from "react";
import urls from "../constants/urls";

function useProviders() {
  const [providers, setProviders] = useState(null);

  const setProvidersCallback = useCallback(
    ({ data }) => {
      setProviders(data);
    },
    [setProviders]
  );

  const getProviders = useCallback(
    token => {
      fetch(`${urls.base}/api/v1/providers`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(setProvidersCallback)
        .catch(e => {
          console.error(e);
        });
    },
    [setProvidersCallback]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    getProviders(token);
  }, [getProviders]);

  return providers;
}

export default useProviders;
