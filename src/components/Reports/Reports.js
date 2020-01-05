import React, { useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate, parseDate } from "react-day-picker/moment";
import {
  Button,
  Dropdown,
  Header,
  Icon,
  Label,
  Radio
} from "semantic-ui-react";

import fetchReport from "../../utils/fetchReport";
import PageHeader from "../PageHeader/PageHeader";
import useChannels from "../../customHooks/useChannels";
import useUsers from "../../customHooks/useUsers";

import "./Reports.css";
import "react-day-picker/lib/style.css";

const Reports = ({ token, setLoading, loading }) => {
  const [type, setType] = useState(null);
  const [user, setUser] = useState(null);
  const [channel, setChannel] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const channels = useChannels(token);
  const users = useUsers(token);

  channels.length > 0 && users.length > 0
    ? setLoading(false)
    : setLoading(true);

  return (
    <div className="reports">
      <PageHeader>
        <Header as="h1">Reports</Header>
      </PageHeader>
      <div className="reports-body">
        <ol>
          <li>
            <div className="type-radios">
              <Header as="h3">
                Select <em>operator</em> or <em>user</em> report:
              </Header>
              <div>
                <Radio
                  label="Operator"
                  name="type"
                  value="channel"
                  checked={type === "channel"}
                  onChange={() => {
                    setStartDate(null);
                    setEndDate(null);
                    setUser(null);
                    setType("channel");
                  }}
                />
              </div>
              <div>
                <Radio
                  label="User"
                  name="type"
                  value="user"
                  checked={type === "user"}
                  onChange={() => {
                    setStartDate(null);
                    setEndDate(null);
                    setChannel(null);
                    setType("user");
                  }}
                />
              </div>
            </div>
          </li>
          {!loading && type && (
            <li>
              <div className="report-select">
                <Header as="h3">
                  Select <em>one {type === "channel" ? "operator" : "user"}</em>{" "}
                  from the list. <em>Type in select box to filter results.</em>
                </Header>
                <div className="selected-entity">
                  <span>
                    Selected
                    {type === "channel" ? " operator: " : " user: "}
                  </span>
                  {(channel !== null || user !== null) && (
                    <Label size="large" color="grey">
                      {type === "channel"
                        ? channel
                          ? JSON.parse(channel).name
                          : ""
                        : user
                        ? JSON.parse(user).name
                        : ""}
                      <Icon
                        name="close"
                        onClick={() => {
                          if (type === "channel") {
                            setStartDate(null);
                            setEndDate(null);
                            setChannel(null);
                          } else {
                            setStartDate(null);
                            setEndDate(null);
                            setUser(null);
                          }
                        }}
                      />
                    </Label>
                  )}
                </div>
                <Dropdown
                  placeholder={
                    type === "channel" ? "Select Operator" : "Select User"
                  }
                  options={
                    type === "channel"
                      ? channels.length > 0 &&
                        channels.map(channel => ({
                          key: channel.id,
                          value: JSON.stringify({
                            id: channel.id,
                            name: channel.name
                          }),
                          text: channel.name
                        }))
                      : channels.length > 0 &&
                        users.map(user => ({
                          key: user.id,
                          value: JSON.stringify({
                            id: user.id,
                            name: user.username
                          }),
                          text: user.username
                        }))
                  }
                  lazyLoad
                  fluid
                  search
                  upward={false}
                  value={type === "channel" ? channel : user}
                  className="report-select-container"
                  onChange={(e, { value }) =>
                    type === "channel" ? setChannel(value) : setUser(value)
                  }
                />
              </div>
            </li>
          )}
          {type && (channel || user) && (
            <li>
              <div className="date-range">
                <Header as="h3">Select a start and end date:</Header>
                <div className="dates-wrapper">
                  <div className="date-wrapper">
                    <Header as="h4">Start Date:</Header>
                    <DayPickerInput
                      formatDate={formatDate}
                      parseDate={parseDate}
                      format="LL"
                      placeholder={formatDate(new Date(), "LL")}
                      onDayChange={date =>
                        date
                          ? setStartDate(formatDate(date, "YYYY-MM-DD"))
                          : setStartDate(null)
                      }
                    />
                  </div>
                  <div className="date-wrapper">
                    <Header as="h4">End Date:</Header>
                    <DayPickerInput
                      formatDate={formatDate}
                      parseDate={parseDate}
                      format="LL"
                      placeholder={formatDate(new Date(), "LL")}
                      onDayChange={date =>
                        date
                          ? setEndDate(formatDate(date, "YYYY-MM-DD"))
                          : setEndDate(null)
                      }
                    />
                  </div>
                </div>
              </div>
            </li>
          )}
          {type && (channel || user) && startDate && endDate && (
            <li>
              <Header as="h3">Download report:</Header>
              <Button
                color="grey"
                onClick={() =>
                  fetchReport(
                    token,
                    user && JSON.parse(user).id,
                    channel && JSON.parse(channel).id,
                    startDate,
                    endDate
                  )
                }
              >
                Get Report
              </Button>
            </li>
          )}
        </ol>
      </div>
    </div>
  );
};

export default Reports;
