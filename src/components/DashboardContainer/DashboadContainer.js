import React from "react";
import { navigate } from "@reach/router";
import moment from "moment";

import { Link } from "@reach/router";
import jwtDecode from "jwt-decode";
import { Button, Container, Loader, Menu, Dimmer } from "semantic-ui-react";

import "./DashboardContainer.css";

const DashboardContainer = ({
  children,
  loading,
  setAuthenticated,
  menuIcon,
}) => {
  const token = localStorage.getItem("token");
  const { username, exp } = jwtDecode(token);
  const logout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate("/");
  };

  // log the user out if the token is expired
  if (token && moment.unix(exp).isBefore(Date.now())) {
    logout();
  }

  return (
    <Container className="dashboard" text>
      <Dimmer active={loading} inverted page>
        <Loader size="big">Loading</Loader>
      </Dimmer>
      <Menu fixed="top" inverted size="massive">
        <Menu.Item>
          <Link to="/">{username}</Link>
          <Button
            size="mini"
            inverted
            icon="log out"
            compact
            onClick={logout}
          />
        </Menu.Item>
        {menuIcon}
      </Menu>
      {children}
    </Container>
  );
};

export default DashboardContainer;
