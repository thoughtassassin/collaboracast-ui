import urls from "../constants/urls";

const getAllFeeds = token =>
  fetch(`${urls.base}/api/v1/feeds`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`
    }
  }).then(response => response.json());

export default getAllFeeds;
