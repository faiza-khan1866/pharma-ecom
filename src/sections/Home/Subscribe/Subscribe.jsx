import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { createSubscribeData } from "../../../http/apiService";
import "./Subscribe.scss";

const initailObject = {
  email: "",
};

const Subscribe = () => {
  const [formValues, setFormValues] = useState(initailObject);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
    // Clear error message when user starts typing again
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const fetchSubscribeFormData = async (updatedData) => {
    try {
      const response = await createSubscribeData(updatedData);
      if (response.status === 200 || response.status === 201) {
        setLoading(false);
        toast.success("Subscribed Successfully!");
        setFormValues({ ...initailObject });
      }
    } catch (error) {
      console.error("Error fetching Data:", error);
      setLoading(false);
      toast.error("Something Went wrong!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email } = formValues;
    const errors = {};
    if (!email) {
      errors.email = "Please Enter Email.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues?.email)
    ) {
      errors.email = "Invalid email address.";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false);
      return;
    }

    let updatedData = { ...formValues };
    setLoading(true);
    fetchSubscribeFormData(updatedData);
  };

  return (
    <div className="subscribe_wraper ptb-60">
      <Container>
        <h2 data-aos="fade-down" data-aos-once="true">
          Subscribe now!
        </h2>
        <p data-aos="fade-down" data-aos-once="true">
          Register Your Email for Exclusive Updates, Exciting Offers, & more!
        </p>

        <Form
          className="query-form-column"
          data-aos="fade-up"
          data-aos-once="true"
        >
          <Row>
            <Col sm={12} md={7} lg={5}>
              <Form.Group controlId="email">
                <Form.Control
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                />
                <p className="mt-2 text-danger form_error_msg">
                  {errors?.email}
                </p>
              </Form.Group>
            </Col>
            <Col sm>
              <Button
                className="subscribe_btn"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Sending..." : "Subscribe"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default Subscribe;
