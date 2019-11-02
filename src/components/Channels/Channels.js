import React from "react";

const Channels = ({ channels }) => {
  return (
    <div>
      <h2>Channels</h2>
      <label>
        Channels
        <select>
          <option value="">Select Channel</option>
          {channels &&
            channels.map(channel => (
              <option key={channel.id} value={channel.id}>
                {channel.name}
              </option>
            ))}
        </select>
      </label>
    </div>
  );
};

export default Channels;
