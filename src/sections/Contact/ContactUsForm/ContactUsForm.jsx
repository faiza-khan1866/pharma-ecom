import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { createContactData } from "../../../http/apiService";
import "./ContactUsForm.scss";

const initailObject = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const ContactUsForm = () => {
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

  const fetchContactFormData = async (updatedData) => {
    try {
      const response = await createContactData(updatedData);
      if (response.status === 200 || response.status === 201) {
        setLoading(false);
        toast.success("Data has been Submitted Successfully!");
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
    const { name, email, phone, message } = formValues;
    const errors = {};
    if (!name) {
      errors.name = "Please Enter Name.";
    } else if (!email) {
      errors.email = "Please Enter Email.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "Invalid email address.";
    } else if (!phone) {
      errors.phone = "Please Enter Phone Number.";
    } else if (!message) {
      errors.message = "Please Enter Message.";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false);
      return;
    }

    let updatedData = { ...formValues };
    setLoading(true);
    fetchContactFormData(updatedData);
  };
  return (
    <div className="contact_form_wraper mb-60">
      <Container fluid>
        <Row>
          <Col lg="3"></Col>
          <Col md="12" lg="9">
            <Form className="contact_form_wrape">
              <h2
                className="contactUs_title"
                data-aos="fade-down"
                data-aos-once="true"
              >
                Fill up the form if you have any question
              </h2>
              <Row>
                <Col sm={4}>
                  <Form.Group
                    controlId="name"
                    className="mb-3"
                    data-aos="fade-up"
                    data-aos-once="true"
                  >
                    <Form.Control
                      type="text"
                      name="name"
                      value={formValues.name}
                      onChange={handleInputChange}
                      placeholder="Name and Surname"
                    />
                    <p className="mt-2 text-danger form_error_msg">
                      {errors?.name}
                    </p>
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Group
                    controlId="email"
                    className="mb-3"
                    data-aos="fade-up"
                    data-aos-once="true"
                  >
                    <Form.Control
                      type="email"
                      name="email"
                      value={formValues.email}
                      onChange={handleInputChange}
                      placeholder="Your E-mail"
                    />
                    <p className="mt-2 text-danger form_error_msg">
                      {errors?.email}
                    </p>
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Group
                    controlId="phone"
                    className="mb-3"
                    data-aos="fade-up"
                    data-aos-once="true"
                  >
                    <Form.Control
                      type="text"
                      name="phone"
                      value={formValues.phone}
                      onChange={handleInputChange}
                      placeholder="Phone"
                    />
                    <p className="mt-2 text-danger form_error_msg">
                      {errors?.phone}
                    </p>
                  </Form.Group>
                </Col>
                <Col sm={12}>
                  <Form.Group
                    controlId="message"
                    className="mb-4"
                    data-aos="fade-up"
                    data-aos-once="true"
                  >
                    <Form.Control
                      as="textarea"
                      name="message"
                      value={formValues.message}
                      onChange={handleInputChange}
                      rows={6}
                      style={{ resize: "none" }}
                      placeholder="Your message"
                    />
                    <p className="mt-2 text-danger form_error_msg">
                      {errors?.message}
                    </p>
                  </Form.Group>
                </Col>
              </Row>
              <div
                className="text-center"
                data-aos="fade-up"
                data-aos-once="true"
              >
                <Button
                  className="submit_button"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? "Sending..." : "Send message"}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUsForm;
