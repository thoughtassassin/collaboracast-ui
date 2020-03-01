import React, { useState } from "react";
import {
  Form,
  Button,
  Comment,
  Header,
  TextArea,
  Label
} from "semantic-ui-react";
import { Formik } from "formik";
import * as yup from "yup";
import jwtDecode from "jwt-decode";
import { navigate } from "@reach/router";

import urls from "../../constants/urls";
import PageHeader from "../PageHeader/PageHeader";

const AddComment = ({ messageId, token, setLoading, setSuccess }) => {
  const [error, setError] = useState(false);
  const { id } = jwtDecode(token);
  const addCommentSuccess = json => {
    if (json.status === "success") {
      setSuccess(json.message);
      setError(false);
      setLoading(false);
      navigate(`/messages/${messageId}/`);
    } else if (json.status === "error") {
      setError(json.message);
      setSuccess(false);
      setLoading(false);
    }
  };
  const formSubmit = ({ comment }) => {
    setLoading(true);
    fetch(`${urls.base}/api/v1/comments`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        content: comment,
        UserId: id,
        MessageId: messageId,
        url: window.location.origin
      })
    })
      .then(response => response.json())
      .then(addCommentSuccess)
      .catch(e => {
        setLoading(false);
        setError("Comment could not be saved.");
        setSuccess(false);
        console.error(e);
      });
  };
  return (
    <div>
      <PageHeader>
        <Header as="h1">Add Comment</Header>
      </PageHeader>
      {error && <Comment error>{error}</Comment>}
      <Formik
        initialValues={{
          comment: ""
        }}
        onSubmit={formSubmit}
        validationSchema={yup.object().shape({
          comment: yup
            .string()
            .max(600, "Comment cannot exceed 600 characters")
            .required("Comment is required")
        })}
      >
        {({ errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form inverted>
            <Form.Field>
              <TextArea
                name="comment"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Comment"
                style={{ minHeight: 200 }}
              />
              {touched.comment && errors.comment && (
                <Label pointing prompt color="red">
                  {errors.comment}
                </Label>
              )}
            </Form.Field>
            <Form.Field>
              <Button primary type="submit" onClick={handleSubmit}>
                Save Comment
              </Button>
            </Form.Field>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddComment;
