import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate, parseDate } from "react-day-picker/moment";
import {
  Button,
  Dropdown,
  Header,
  Message as SemanticMessage,
  Icon,
  Label,
  Radio,
} from "semantic-ui-react";

import fetchReport from "../../utils/fetchReport";
import fetchPDFReport from "../../utils/fetchPDFReport";
import PageHeader from "../PageHeader/PageHeader";
import useChannels from "../../customHooks/useChannels";
import useUsers from "../../customHooks/useUsers";

import "./Reports.css";
import "react-day-picker/lib/style.css";

const Reports = ({ token, setLoading, loading }) => {
  const [error, setError] = useState(null);
  const [type, setType] = useState(null);
  const [user, setUser] = useState(null);
  const [channel, setChannel] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const channels = useChannels(token);
  const users = useUsers(token);

  channels && channels.length > 0 && users.length > 0
    ? setLoading(false)
    : setLoading(true);

  const getReport = async () => {
    try {
      await fetchReport(
        token,
        user && JSON.parse(user).id,
        channel && JSON.parse(channel).id,
        startDate,
        endDate
      );
      setError(null);
    } catch (e) {
      if (
        e.message ===
        "A report could not be fetched because the parameters returned no results."
      ) {
        setError(
          "A report could not be generated because the parameters returned no results. Please try another user, channel, start date or end date."
        );
      } else {
        console.error(e);
      }
    }
  };

  const getPDFReport = async () => {
    try {
      await fetchPDFReport(
        token,
        user && JSON.parse(user).id,
        channel && JSON.parse(channel).id,
        startDate,
        endDate
      );
      setError(null);
    } catch (e) {
      if (
        e.message ===
        "A report could not be fetched because the parameters returned no results."
      ) {
        setError(
          "A report could not be generated because the parameters returned no results. Please try another user, channel, start date or end date."
        );
      } else {
        console.error(e);
      }
    }
  };

  return (
    <div className="reports">
      <PageHeader>
        <Header as="h1">Reports</Header>
      </PageHeader>
      <div className="reports-body">
        {error && (
          <SemanticMessage negative onDismiss={() => setError(null)}>
            {error}
          </SemanticMessage>
        )}
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
          <CSSTransition
            in={!loading && !!type}
            timeout={250}
            unmountOnExit
            className="appear"
          >
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
                      ? channels.length > 0
                        ? channels.map((channel) => ({
                            key: channel.id,
                            value: JSON.stringify({
                              id: channel.id,
                              name: channel.name,
                            }),
                            text: channel.name,
                          }))
                        : []
                      : users.length > 0
                      ? users.map((user) => ({
                          key: user.id,
                          value: JSON.stringify({
                            id: user.id,
                            name: user.username,
                          }),
                          text: user.username,
                        }))
                      : []
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
          </CSSTransition>
          <CSSTransition
            in={!!type && (!!channel || !!user)}
            timeout={250}
            unmountOnExit
            className="appear"
          >
            <li>
              <div className="date-range">
                <Header as="h3">
                  Select a <em>start</em> and <em>end</em> date:
                </Header>
                <div className="dates-wrapper">
                  <div className="date-wrapper">
                    <Label color="grey" size="massive">
                      <Header as="h4">Start Date:</Header>
                    </Label>
                    <DayPickerInput
                      formatDate={formatDate}
                      parseDate={parseDate}
                      format="LL"
                      placeholder={formatDate(new Date(), "LL")}
                      dayPickerProps={{
                        disabledDays: { after: moment().toDate() },
                      }}
                      onDayChange={(date) =>
                        date
                          ? setStartDate(formatDate(date, "YYYY-MM-DD"))
                          : setStartDate(null)
                      }
                    />
                  </div>
                  <div className="date-wrapper">
                    <Label color="grey" size="massive">
                      <Header as="h4">End Date:</Header>
                    </Label>
                    <DayPickerInput
                      formatDate={formatDate}
                      parseDate={parseDate}
                      format="LL"
                      placeholder={formatDate(new Date(), "LL")}
                      dayPickerProps={{
                        disabledDays: [
                          { before: moment(startDate).toDate() },
                          { after: moment().toDate() },
                        ],
                      }}
                      onDayChange={(date) =>
                        date
                          ? setEndDate(formatDate(date, "YYYY-MM-DD"))
                          : setEndDate(null)
                      }
                    />
                  </div>
                </div>
              </div>
            </li>
          </CSSTransition>
          <CSSTransition
            in={!!type && (!!channel || !!user) && !!startDate && !!endDate}
            timeout={250}
            unmountOnExit
            className="appear"
          >
            <li id="downloadStep">
              <Header as="h3">Download report:</Header>
              <Button color="blue" size="large" onClick={getReport}>
                Download Excel Report
              </Button>
              <Button color="blue" size="large" onClick={getPDFReport}>
                Download PDF Report
              </Button>
            </li>
          </CSSTransition>
        </ol>
      </div>
    </div>
  );
};

export default Reports;
