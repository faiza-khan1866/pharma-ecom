import React, { useState } from "react";
// import { API } from "../../http/API";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "./TrackOrder.scss";

const defaultState = {
  order_id: "",
};

const TrackOrder = ({ xauthtoken }) => {
  const [trackingprocess, setTrackingprocess] = useState();

  const [formValues, setFormValues] = useState(defaultState);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let header = {
      headers: {
        Authorization: `Bearer ${xauthtoken}`,
      },
    };
    // API.get(`/auth/track-order/${formValues?.order_id}`, header)
    //   .then((response) => {
    //     if (response.status === 200 || response.status === 201) {
    //       setLoading(false);
    //       // setFormValues({ ...defaultState });
    //       setTrackingprocess(response?.data?.status);
    //     }
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     console.log(err);
    //   });
  };
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={12} md={10} lg={8}>
          <div
            className="mb-60 track_order_wrape"
            data-aos="zoom-in"
            data-aos-once="true"
          >
            <h4 className="title" data-aos="fade-down" data-aos-once="true">
              Order Tracking
            </h4>
            <p data-aos="fade-up" data-aos-once="true">
              To track your order please enter your Order ID in the box below
              and press the "Track" button.
            </p>
            <Form data-aos="fade-up" data-aos-once="true">
              <Form.Group controlId="name" className="mb-4">
                <Form.Label>Order ID *</Form.Label>
                <Form.Control
                  type="text"
                  name="order_id"
                  placeholder="Found in your order Confirmation email"
                  value={formValues?.order_id}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button className="btn_submit" onClick={handleSubmit}>
                Track
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TrackOrder;
