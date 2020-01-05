import urls from "../constants/urls";
import moment from "moment";

const fetchReport = async (token, userId, channelId, beginDate, endDate) => {
  // check if all necessary arguments are sent
  if (!token || !beginDate || !endDate || (!channelId && !userId)) {
    throw new Error(`fetchReport requires a valid token, 
        a user id or a channel id and both a begin and end date`);
  }
  // check if dates are in the future
  if (
    moment(beginDate).isAfter(moment()) ||
    moment(endDate).isAfter(moment())
  ) {
    throw new Error(`fetchReport requires that both dates be in the past`);
  }
  // check if beginDate is before endDate
  if (moment(beginDate).isAfter(endDate)) {
    throw new Error(
      `fetchReport requires that the start date is before the end date`
    );
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
  if (
    blob.type ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    let lnk = document.createElement("a"),
      objectURL;
    lnk.download = "report.xlsx";
    lnk.href = objectURL = URL.createObjectURL(blob);
    lnk.dispatchEvent(new MouseEvent("click"));
    setTimeout(URL.revokeObjectURL.bind(URL, objectURL));
  } else {
    throw new Error(
      "A report could not be fetched because the parameters returned no results."
    );
  }
};

export default fetchReport;
