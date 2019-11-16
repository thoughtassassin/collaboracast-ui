import urls from "../constants/urls";

const getAllChannels = token =>
  fetch(`${urls.base}/api/v1/channels`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`
    }
  }).then(response => response.json());

export default getAllChannels;
