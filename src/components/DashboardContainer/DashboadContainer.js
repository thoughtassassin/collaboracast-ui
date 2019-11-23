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
  feedsMenu,
  loading,
  setAuthenticated
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
      <Menu fixed="top" inverted color="teal">
        <Menu.Item>
          <Link to="/">
            <Icon name="user" /> {username}
          </Link>
          <Button size="mini" compact inverted onClick={logout}>
            <Icon name="log out" />
          </Button>
        </Menu.Item>
        {feedsMenu}
      </Menu>
      {children}
    </Container>
  );
};

export default DashboardContainer;
