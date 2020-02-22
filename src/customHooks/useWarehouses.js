import { useEffect, useCallback, useState } from "react";
import urls from "../constants/urls";

function useWarehouses() {
  const [warehouses, setWarehouses] = useState(null);

  const setWarehousesCallback = useCallback(
    ({ data }) => {
      setWarehouses(data);
    },
    [setWarehouses]
  );

  const getWarehouses = useCallback(
    token => {
      fetch(`${urls.base}/api/v1/warehouses`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        }
      })
        .then(response => response.json())
        .then(setWarehousesCallback)
        .catch(e => {
          console.error(e);
        });
    },
    [setWarehousesCallback]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    getWarehouses(token);
  }, [getWarehouses]);

  return warehouses;
}

export default useWarehouses;
