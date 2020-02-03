import urls from "../constants/urls";

const requestChannel = async (channelName, token) => {
  const response = await fetch(`${urls.base}/api/v1/request-channel/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`
    },
    method: "post",
    body: JSON.stringify({
      name: channelName
    })
  });
  return response.json();
};

export default requestChannel;
