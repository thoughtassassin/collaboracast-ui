import urls from "../constants/urls";

const fetchReport = async (token, userId, channelId, beginDate, endDate) => {
  if (!token || !beginDate || !endDate || (!channelId && !userId)) {
    throw new Error(`fetchReport requires a valid token, 
        a user id or a channel id and both a begin and end date`);
  }

  let route = userId ? `/users/${userId}` : `/channels/${channelId}`;

  const response = await fetch(`${urls.base}/api/v1/reports${route}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`
    },
    body: JSON.stringify({
      beginDate,
      endDate
    })
  });

  const blob = await response.blob();
  let lnk = document.createElement("a"),
    objectURL;
  lnk.download = "report.xlsx";
  lnk.href = objectURL = URL.createObjectURL(blob);
  lnk.dispatchEvent(new MouseEvent("click"));
  setTimeout(URL.revokeObjectURL.bind(URL, objectURL));
};

export default fetchReport;
