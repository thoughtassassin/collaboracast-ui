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
      setLoading(false);
      navigate(`/${channelId}/contacts`);
    } else if (json.status === "error") {
      setError(json.message);
      setSuccess(false);
      setLoading(false);
    }
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
        zip: zip || null,
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
        <Header as="h1">
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
          zip: null,
          email: ""
        }}
        onSubmit={formSubmit}
        validationSchema={yup.object().shape(
          {
            firstName: yup.string().required("First Name is required"),
            lastName: yup.string().required("Last Name is required"),
            email: yup
              .string()
              .email()
              .when("phone", {
                is: (phone, email) => !(phone || email),
                then: yup.string().required("Phone or email is required")
              }),
            phone: yup.string().when("email", {
              is: (phone, email) => !(phone || email),
              then: yup.string().required("Phone or email is required")
            }),
            zip: yup
              .number()
              .typeError("Must be a number.")
              .nullable()
          },
          [["email", "phone"]]
        )}
      >
        {({
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <Form inverted className="add-contact">
            <Form.Field>
              <Input
                name="firstName"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                label={{ basic: true, content: "First Name" }}
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
                label={{ basic: true, content: "Last Name" }}
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
                label={{ basic: true, content: "Group" }}
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
                label={{ basic: true, content: "Position" }}
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
                label={{ basic: true, content: "Phone" }}
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
                label={{ basic: true, content: "Address 1" }}
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
                label={{ basic: true, content: "Address 2" }}
              />
            </Form.Field>
            <Form.Field>
              <Input
                name="city"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                label={{ basic: true, content: "City" }}
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
                label={{ basic: true, content: "State" }}
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
                label={{ basic: true, content: "Zip" }}
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
                label={{ basic: true, content: "Email" }}
              />
              {touched.zip && errors.email && (
                <Label pointing prompt color="red">
                  {errors.email}
                </Label>
              )}
            </Form.Field>
            <Form.Field>
              <Button
                primary
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
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
