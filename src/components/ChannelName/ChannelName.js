import React from "react";
import { Location } from "@reach/router";

const ChannelName = ({ channels, resource }) => (
  <Location>
    {({ location }) => {
      let channelObj = "",
        channelId = "";
      const channelIdArray = location.pathname.match(resource);
      if (channelIdArray && channels) {
        channelId = channelIdArray.pop();
        channelObj = channels.filter(
          channel => channel.id.toString() === channelId
        )[0];
      }

      return <span>{channelObj && channelObj.name}</span>;
    }}
  </Location>
);

export default ChannelName;
