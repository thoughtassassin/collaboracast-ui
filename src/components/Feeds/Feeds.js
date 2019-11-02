import React from "react";

const Feeds = ({ feeds, setFeed }) => {
  return (
    <div>
      <h2>Feeds</h2>
      <label>
        Feeds
        <select onChange={e => setFeed(e.target.value)}>
          <option value="">Select Feed</option>
          {feeds &&
            feeds.map(feed => (
              <option key={feed.id} value={feed.id}>
                {feed.name}
              </option>
            ))}
        </select>
      </label>
    </div>
  );
};

export default Feeds;
