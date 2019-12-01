import React, { useState } from "react";
import { Form, Button, Message, Header, Input, Label } from "semantic-ui-react";
import { navigate } from "@reach/router";
import { Formik } from "formik";
import * as yup from "yup";

import urls from "../../constants/urls";
import ChannelName from "../ChannelName/ChannelName";
import PageHeader from "../PageHeader/PageHeader";
import "./AddContact.css";

const AddContact = ({ channelId, channels, token, setLoading, setSuccess }) => {
  const [error, setError] = useState(false);
  const addContactSuccess = json => {
    if (json.status === "success") {
      setSuccess(json.message);
      setError(false);
      navigate(`/${channelId}/contacts`);
    } else if (json.status === "error") {
      setError(json.message);
      setSuccess(false);
    }
    setLoading(false);
  };
  const formSubmit = ({
    firstName,
    lastName,
    group,
    position,
    phone,
    address1,
    address2,
    city,
    state,
    zip,
    email
  }) => {
    setLoading(true);
    fetch(`${urls.base}/api/v1/contacts`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        firstName,
        lastName,
        group,
        position,
        phone,
        address1,
        address2,
        city,
        state,
        zip,
        email,
        ChannelId: channelId
      })
    })
      .then(response => response.json())
      .then(addContactSuccess)
      .catch(e => {
        setLoading(false);
        setError("Contact could not be saved.");
        setSuccess(false);
        console.error(e);
      });
  };
  return (
    <div>
      <PageHeader>
        <Header as="h3">
          Add Contact To{" "}
          <ChannelName
            channels={channels}
            resource={/\/add-contact\/([0-9]+).?\/?/}
          />
        </Header>
      </PageHeader>
      {error && <Message error>{error}</Message>}
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          business: "",
          phone: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          zip: "",
          email: ""
        }}
        onSubmit={formSubmit}
        validationSchema={yup.object().shape({
          firstName: yup.string().required("First Name is required"),
          lastName: yup.string().required("Last Name is required"),
          group: yup.string().required("Group is required"),
          position: yup.string().required("Position is required"),
          phone: yup.string().required("Phone is required"),
          address1: yup.string().required("Address1 field is required"),
          city: yup.string().required("City is required"),
          state: yup.string().required("State is required"),
          zip: yup.string().required("Zip is required"),
          email: yup.string().required("Email is required")
        })}
      >
        {({ errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form inverted className="add-contact">
            <Form.Field>
              <Input
                name="firstName"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                label="First Name"
              />
              {touched.firstName && errors.firstName && (
                <Label pointing prompt color="red">
                  {errors.firstName}
                </Label>
              )}
            </Form.Field>
            <Form.Field>
              <Input
                name="lastName"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Last Name"
              />
              {touched.lastName && errors.lastName && (
                <Label pointing prompt color="red">
                  {errors.lastName}
                </Label>
              )}
            </Form.Field>
            <Form.Field>
              <Input
                name="group"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Group"
              />
              {touched.group && errors.group && (
                <Label pointing prompt color="red">
                  {errors.group}
                </Label>
              )}
            </Form.Field>
            <Form.Field>
              <Input
                name="position"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Position"
              />
              {touched.position && errors.position && (
                <Label pointing prompt color="red">
                  {errors.position}
                </Label>
              )}
            </Form.Field>
            <Form.Field>
              <Input
                name="phone"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Phone"
              />
              {touched.phone && errors.phone && (
                <Label pointing prompt color="red">
                  {errors.phone}
                </Label>
              )}
            </Form.Field>
            <Form.Field>
              <Input
                name="address1"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Address 1"
              />
              {touched.address1 && errors.address1 && (
                <Label pointing prompt color="red">
                  {errors.address1}
                </Label>
              )}
            </Form.Field>
            <Form.Field>
              <Input
                name="address2"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Address 2"
              />
            </Form.Field>
            <Form.Field>
              <Input
                name="city"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                label="City"
              />
              {touched.city && errors.city && (
                <Label pointing prompt color="red">
                  {errors.city}
                </Label>
              )}
            </Form.Field>
            <Form.Field>
              <Input
                name="state"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                label="State"
              />
              {touched.state && errors.state && (
                <Label pointing prompt color="red">
                  {errors.state}
                </Label>
              )}
            </Form.Field>
            <Form.Field>
              <Input
                name="zip"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Zip"
              />
              {touched.zip && errors.zip && (
                <Label pointing prompt color="red">
                  {errors.zip}
                </Label>
              )}
            </Form.Field>
            <Form.Field>
              <Input
                name="email"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Email"
              />
              {touched.zip && errors.email && (
                <Label pointing prompt color="red">
                  {errors.email}
                </Label>
              )}
            </Form.Field>
            <Form.Field>
              <Button color="green" type="submit" onClick={handleSubmit}>
                Save Contact
              </Button>
            </Form.Field>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddContact;
