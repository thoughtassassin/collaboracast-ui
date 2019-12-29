import React from "react";
import { Button } from "semantic-ui-react";

import fetchReport from "../../utils/fetchReport";
import PageHeader from "../PageHeader/PageHeader";

const Reports = ({ token }) => {
  return (
    <PageHeader>
      <Button
        onClick={() => fetchReport(token, null, 8, "2019-12-01", "2019-12-23")}
      >
        Get Report
      </Button>
    </PageHeader>
  );
};

export default Reports;
