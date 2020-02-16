import React, { useState } from "react";
import {
  Dimmer,
  Header,
  Loader,
  List,
  Message,
  Radio
} from "semantic-ui-react";
import PageHeader from "../PageHeader/PageHeader";
import urls from "../../constants/urls";
import useLoader from "../../customHooks/useLoader";
import useUser from "../../customHooks/useUser";
import useUserChannels from "../../customHooks/useUserChannels";

import "./UserChannels.css";

const UserChannels = ({ id, listItems, displayValue, success, setSuccess }) => {
  const [updateIncrement, setUpdateIncrement] = useState(0);
  const user = useUser(id);
  const [loading, setLoading] = useLoader();
  const userChannels = useUserChannels(setLoading, user.email, updateIncrement);
  const token = localStorage.getItem("token");

  const addChannel = channel => {
    setLoading(true);
    fetch(`${urls.base}/api/v1/user-channels/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        ChannelId: channel.id,
        UserId: user.id
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setUpdateIncrement(updateIncrement => updateIncrement + 1);
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        console.error(e);
      });
  };

  const removeChannel = channel => {
    setLoading(true);
    fetch(`${urls.base}/api/v1/user-channels/`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        ChannelId: channel.id,
        UserId: user.id
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setUpdateIncrement(updateIncrement => updateIncrement + 1);
        setLoading(false);
      })

      .catch(e => {
        setLoading(false);
        console.error(e);
      });
  };

  const handleClick = (channelId, hasAccess) =>
    hasAccess ? removeChannel(channelId) : addChannel(channelId);

  const verifyAccess = item =>
    userChannels.map(userChannel => userChannel.id).includes(item.id);

  return user ? (
    <div className="user-channels-list">
      <Dimmer active={loading} inverted page>
        <Loader size="big">Loading</Loader>
      </Dimmer>
      <PageHeader>
        <Header as="h1">Channels for {user.username}</Header>
      </PageHeader>
      {success && (
        <Message positive onDismiss={() => setSuccess(false)}>
          {success}
        </Message>
      )}
      {user && user.email && (
        <List divided relaxed size="huge">
          {listItems &&
            listItems.map(listItem => (
              <List.Item key={`${listItem.id}-${user.email.toLowerCase()}`}>
                <List.Content>
                  <div>
                    <span className="item-name">{listItem[displayValue]}</span>
                    <div className="callout">
                      <Radio
                        toggle
                        checked={verifyAccess(listItem)}
                        onClick={() =>
                          handleClick(listItem, verifyAccess(listItem))
                        }
                      />
                    </div>
                  </div>
                </List.Content>
              </List.Item>
            ))}
        </List>
      )}
    </div>
  ) : null;
};
export default UserChannels;
