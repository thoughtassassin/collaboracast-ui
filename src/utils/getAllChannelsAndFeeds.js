import getAllChannels from "./getAllChannels";
import getAllFeeds from "./getAllFeeds";

const getAllChannelsAndFeeds = (token, callback) => {
  const channels = getAllChannels(token);
  const feeds = getAllFeeds(token);

  return Promise.all([channels, feeds]).then(callback);
};

export default getAllChannelsAndFeeds;
