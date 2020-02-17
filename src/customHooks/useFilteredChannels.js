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

  const clearSearch = () => setSearchTerm("");

  return [filteredChannels, searchTerm, handleChange, clearSearch];
}

export default useFilteredChannels;
