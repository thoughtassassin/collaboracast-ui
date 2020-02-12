import urls from "../constants/urls";

const requestChannel = async (channelName, username, token) => {
  const response = await fetch(`${urls.base}/api/v1/request-channel/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`
    },
    method: "post",
    body: JSON.stringify({
      name: channelName,
      username: username
    })
  });
  return response.json();
};

export default requestChannel;
