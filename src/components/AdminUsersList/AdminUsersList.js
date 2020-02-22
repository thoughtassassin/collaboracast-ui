import React, { useState } from "react";
import AdminArchiveButton from "../AdminArchiveButton/AdminArchiveButton";
import { Button, Message } from "semantic-ui-react";
import ItemsList from "../ItemsList/ItemsList";
import { navigate } from "@reach/router";

import "./AdminUsersList.css";

const AdminUsersList = ({
  users,
  setLoading,
  setSuccess,
  setUpdateIncrement,
  success,
  token
}) => {
  const [error, setError] = useState(null);
  return (
    <div className="users-list">
      <div className="add-button">
        <Button onClick={() => navigate("/add-user")} size="small" primary>
          Add User
        </Button>
      </div>
      {success && (
        <Message positive onDismiss={() => setSuccess(false)}>
          {success}
        </Message>
      )}
      {error && (
        <Message negative onDismiss={() => setError(null)}>
          {error}
        </Message>
      )}
      <ItemsList
        listItems={users}
        header="Users"
        displayValue="username"
        resource="users"
        calloutItem={
          <AdminArchiveButton
            archiveUrl="/api/v1/users"
            setUpdateIncrement={setUpdateIncrement}
            setError={setLoading}
            setLoading={setLoading}
            token={token}
          />
        }
        calloutValue="username"
      />
    </div>
  );
};

export default AdminUsersList;
