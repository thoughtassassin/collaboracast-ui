import React from "react";
import { Button } from "semantic-ui-react";
import urls from "../../constants/urls";

const AdminAchiveButton = ({
  clearSearch,
  archiveUrl,
  id,
  setUpdateIncrement,
  setError,
  setLoading,
  token,
  value
}) => {
  const handleClick = e => {
    e.preventDefault();
    if (window.confirm(`Do you want to archive ${value}?`)) {
      setLoading(true);
      setError(null);
      fetch(`${urls.base}${archiveUrl}/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`
        },
        body: JSON.stringify({
          archived: true
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setUpdateIncrement(updateIncrement => updateIncrement + 1);
          clearSearch && clearSearch();
          setLoading(false);
        })
        .catch(e => {
          setError("Could not archive channel");
          setLoading(false);
          console.error(e);
        });
    } else {
      return false;
    }
  };
  return (
    <Button className="adminArchiveButton" onClick={handleClick} type="button">
      Archive
    </Button>
  );
};

export default AdminAchiveButton;
