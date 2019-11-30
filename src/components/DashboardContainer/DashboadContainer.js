import React from "react";
import { navigate } from "@reach/router";

import { Link } from "@reach/router";
import jwtDecode from "jwt-decode";
import {
  Button,
  Container,
  Loader,
  Menu,
  Icon,
  Dimmer
} from "semantic-ui-react";

import "./DashboardContainer.css";

const DashboardContainer = ({
  children,
  loading,
  setAuthenticated,
  menuIcon
}) => {
  const token = localStorage.getItem("token");
  const { username } = jwtDecode(token);
  const logout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    navigate("/");
  };
  return (
    <Container className="dashboard" text>
      <Dimmer active={loading} page>
        <Loader size="big">Loading</Loader>
      </Dimmer>
      <Menu fixed="top" inverted size="massive">
        <Menu.Item>
          <Link to="/">
            <Icon name="user" /> {username}
          </Link>
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
