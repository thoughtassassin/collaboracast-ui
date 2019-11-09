const getAllFeeds = token =>
  fetch(`https://collaboracast.herokuapp.com/api/v1/feeds`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`
    }
  }).then(response => response.json());

export default getAllFeeds;
