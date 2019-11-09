const getAllChannels = token =>
  fetch(`https://collaboracast.herokuapp.com/api/v1/channels`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`
    }
  }).then(response => response.json());

export default getAllChannels;
