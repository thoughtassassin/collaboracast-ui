import React, { useState } from "react";
import {
  Form,
  Button,
  Comment,
  Header,
  Input,
  Label,
  Select
} from "semantic-ui-react";
import { Formik } from "formik";
import * as yup from "yup";
import { navigate } from "@reach/router";

import urls from "../../constants/urls";
import PageHeader from "../PageHeader/PageHeader";
import randomString from "../../utils/randomString";
import useProviders from "../../customHooks/useProviders";
import useRoles from "../../customHooks/useRoles";
import useWarehouses from "../../customHooks/useWarehouses";

const AddUser = ({ token, setLoading, setUpdateIncrement, setSuccess }) => {
  const [error, setError] = useState(false);
  const providers = useProviders();
  const roles = useRoles();
  const warehouses = useWarehouses();
  const addUserSuccess = json => {
    if (json.status === "success") {
      setSuccess(json.message);
      setUpdateIncrement(updateIncrement => updateIncrement + 1);
      setError(false);
      setLoading(false);
      navigate(`/users/`);
    } else if (json.status === "error") {
      setError(json.message);
      setSuccess(false);
      setLoading(false);
    }
  };
  const formSubmit = ({
    email,
    phone,
    provider,
    role,
    username,
    warehouse
  }) => {
    setLoading(true);
    fetch(`${urls.base}/api/v1/users`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        email: email,
        phone: phone,
        password: randomString(16),
        ProviderId: provider,
        RoleId: role,
        username: username,
        WarehouseId: warehouse
      })
    })
      .then(response => response.json())
      .then(addUserSuccess)
      .catch(e => {
        setLoading(false);
        setError("User could not be saved.");
        setSuccess(false);
        console.error(e);
      });
  };
  const generateOptions = (items, text) =>
    items.map(item => ({ value: item.id, text: item[text] }));
  return providers && roles && warehouses ? (
    <div>
      <PageHeader>
        <Header as="h1">Add User</Header>
      </PageHeader>
      {error && <Comment error>{error}</Comment>}
      <Formik
        initialValues={{
          email: "",
          phone: "",
          provider: "",
          role: "",
          username: "",
          warehouse: ""
        }}
        onSubmit={formSubmit}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email()
            .required("Email is required"),
          phone: yup.string().required("Phone is required"),
          provider: yup.string().required("Provider is required"),
          role: yup.string().required("Role is required"),
          username: yup.string().required("Username is required"),
          warehouse: yup.string().required("Warehouse is required")
        })}
      >
        {({
          errors,
          touched,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue
        }) => (
          <Form>
            <Form.Field>
              <Input
                name="username"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Username"
              />
              {touched.username && errors.username && (
                <Label pointing prompt color="red">
                  {errors.username}
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
              {touched.email && errors.email && (
                <Label pointing prompt color="red">
                  {errors.email}
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
              <Select
                name="email"
                onChange={(_, { value }) => setFieldValue("role", value)}
                placeholder="Select Role"
                options={generateOptions(roles, "role")}
                value={values.role.id}
              />
              {touched.role && errors.role && (
                <Label pointing prompt color="red">
                  {errors.role}
                </Label>
              )}
            </Form.Field>
            <Form.Field>
              <Select
                onChange={(_, { value }) => setFieldValue("provider", value)}
                placeholder="Select Provider"
                options={generateOptions(providers, "name")}
                value={values.provider.id}
              />
              {touched.provider && errors.provider && (
                <Label pointing prompt color="red">
                  {errors.provider}
                </Label>
              )}
            </Form.Field>
            <Form.Field>
              <Select
                onChange={(_, { value }) => setFieldValue("warehouse", value)}
                placeholder="Select Warehouse"
                options={generateOptions(warehouses, "name")}
                value={values.warehouse.id}
              />
              {touched.warehouse && errors.warehouse && (
                <Label pointing prompt color="red">
                  {errors.warehouse}
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
                Save User
              </Button>
            </Form.Field>
          </Form>
        )}
      </Formik>
    </div>
  ) : (
    <div>loading...</div>
  );
};

export default AddUser;
