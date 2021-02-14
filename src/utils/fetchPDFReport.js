import urls from "../constants/urls";
import moment from "moment";

const fetchPDFReport = async (token, userId, channelId, beginDate, endDate) => {
  // check if all necessary arguments are sent
  if (!token || !beginDate || !endDate || (!channelId && !userId)) {
    throw new Error(`fetchPDFReport requires a valid token, 
        a user id or a channel id and both a begin and end date`);
  }
  // check if dates are in the future
  if (
    moment(beginDate).isAfter(moment()) ||
    moment(endDate).isAfter(moment())
  ) {
    throw new Error(`fetchPDFReport requires that both dates be in the past`);
  }
  // check if beginDate is before endDate
  if (moment(beginDate).isAfter(endDate)) {
    throw new Error(
      `fetchPDFReport requires that the start date is before the end date`
    );
  }

  let route = userId ? `/users/${userId}` : `/channels/${channelId}`;

  const response = await fetch(`${urls.base}/api/v1/pdfreports${route}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify({
      beginDate,
      endDate,
    }),
  });

  const blob = await response.blob();
  if (blob.type === "application/pdf") {
    let lnk = document.createElement("a"),
      objectURL;
    lnk.download = "report.pdf";
    lnk.href = objectURL = URL.createObjectURL(blob);
    //lnk.text = "Download Report";
    const downloadArea = document.getElementById("downloadStep");
    const wrapperDiv = document.createElement("div");
    wrapperDiv.classList.add("report-link");
    wrapperDiv.appendChild(lnk);
    downloadArea.appendChild(wrapperDiv);
    lnk.dispatchEvent(new MouseEvent("click"));
    // setTimeout(URL.revokeObjectURL.bind(URL, objectURL));
  } else {
    throw new Error(
      "A report could not be fetched because the parameters returned no results."
    );
  }
};

export default fetchPDFReport;
