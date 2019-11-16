import React, { useState } from "react";
import { Form, Button, Message, Header, Input, Label } from "semantic-ui-react";
import { Formik } from "formik";
import * as yup from "yup";

import urls from "../../constants/urls";

const AddContact = ({ channelId, channel, token, setLoading }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const addContactSuccess = json => {
    if (json.status === "success") {
      setSuccess(json.message);
      setError(false);
    } else if (json.status === "error") {
      setError(json.message);
      setSuccess(false);
    }
    setLoading(false);
  };
  const formSubmit = ({
    firstName,
    lastName,
    business,
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
        business,
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
      <Header as="h2" inverted>
        Add Contact To {channel}
      </Header>
      {success && <Message positive>{success}</Message>}
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
          business: yup.string().required("Business is required"),
          phone: yup.string().required("Phone is required"),
          address1: yup.string().required("Address1 field is required"),
          city: yup.string().required("City is required"),
          state: yup.string().required("State is required"),
          zip: yup.string().required("Zip is required"),
          email: yup.string().required("Email is required")
        })}
      >
        {({ errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form inverted>
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
                name="business"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Business"
              />
              {touched.business && errors.business && (
                <Label pointing prompt color="red">
                  {errors.business}
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
              <Button color="teal" type="submit" onClick={handleSubmit}>
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
