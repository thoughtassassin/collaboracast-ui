import { useState } from "react";

function useFilteredChannels(channels) {
  const [filteredChannels, setFilteredChannels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = ({ target: { value } }) => {
    if (value !== "") {
      setFilteredChannels(
        channels.filter(channel =>
          channel.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredChannels([]);
    }
    setSearchTerm(value);
  };

  return [filteredChannels, searchTerm, handleChange];
}

export default useFilteredChannels;
