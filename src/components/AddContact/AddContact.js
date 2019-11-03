import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Message,
  Header,
  Dimmer,
  Loader
} from "semantic-ui-react";

const AddContact = ({ channelId, channel, token, loading, setLoading }) => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    business: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: ""
  });
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
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    const {
      firstName,
      lastName,
      business,
      phone,
      address1,
      address2,
      city,
      state,
      zip
    } = contact;
    fetch("https://collaboracast.herokuapp.com/api/v1/contacts", {
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
    <Container text>
      {loading && (
        <Dimmer active className="collaboradimmer">
          <Loader size="big">Loading</Loader>
        </Dimmer>
      )}
      <Header as="h2" inverted>
        Add Contact To {channel}
      </Header>
      {success && <Message positive>{success}</Message>}
      {error && <Message error>{error}</Message>}
      <Form onSubmit={handleSubmit} inverted>
        <Form.Field>
          <label>
            First Name
            <input
              name="firstName"
              type="text"
              value={contact.firstName}
              onChange={e =>
                setContact({ ...contact, firstName: e.target.value })
              }
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label>
            Last Name
            <input
              name="lastName"
              type="text"
              value={contact.lastName}
              onChange={e =>
                setContact({ ...contact, lastName: e.target.value })
              }
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label>
            Business
            <input
              name="business"
              type="text"
              value={contact.business}
              onChange={e =>
                setContact({ ...contact, business: e.target.value })
              }
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label>
            Phone
            <input
              name="phone"
              type="text"
              value={contact.phone}
              onChange={e => setContact({ ...contact, phone: e.target.value })}
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label>
            Address 1
            <input
              name="address1"
              type="text"
              value={contact.address1}
              onChange={e =>
                setContact({ ...contact, address1: e.target.value })
              }
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label>
            Address 2
            <input
              name="address2"
              type="text"
              value={contact.address2}
              onChange={e =>
                setContact({ ...contact, address2: e.target.value })
              }
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label>
            City
            <input
              name="city"
              type="text"
              value={contact.city}
              onChange={e => setContact({ ...contact, city: e.target.value })}
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label>
            State
            <input
              name="firstName"
              type="text"
              value={contact.state}
              onChange={e => setContact({ ...contact, state: e.target.value })}
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label>
            Zip
            <input
              name="zip"
              type="text"
              value={contact.zip}
              onChange={e => setContact({ ...contact, zip: e.target.value })}
            />
          </label>
        </Form.Field>
        <Form.Field>
          <Button color="teal" type="submit">
            Save Contact
          </Button>
        </Form.Field>
      </Form>
    </Container>
  );
};

export default AddContact;
