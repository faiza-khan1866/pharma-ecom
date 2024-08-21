import React, { useState } from "react";
import { Modal, Button, Row, Col, Container, Form } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import { createForgetPaswordData } from "../../../http/apiService";
import "./ForgetPassword.scss";

const initailObject = {
  email: "",
  redirect_url: "https://medi-express.prismcloudhosting.com/",
};

const ForgetPassword = (props) => {
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

  const fetchForgetPaswordFormData = async (updatedData) => {
    try {
      const response = await createForgetPaswordData(updatedData);
      if (response?.data?.errors) {
        setLoading(false);
        toast.error(response?.data?.errors?.email?.[0]);
      } else {
        setLoading(false);
        toast.success(response?.data);
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
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "Invalid email address.";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false);
      return;
    }

    let updatedData = { ...formValues };
    setLoading(true);
    fetchForgetPaswordFormData(updatedData);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="forget_pass_wraper"
      backdrop="static"
    >
      <Modal.Body>
        <p className="text-end p-1 m-0">
          <MdClose
            fontSize="24px"
            className="closeIcon"
            onClick={props?.onHide}
          />
        </p>
        <Container>
          <h2 className="main-title" data-aos="fade-down" data-aos-once="true">
            Lost your password? Please enter your username or email address. You
            will receive a link to create a new password via email.
          </h2>
          <Row>
            <Col sm={8}>
              <Form data-aos="fade-up" data-aos-once="true">
                <Form.Group controlId="email" className="mb-4">
                  <Form.Label>Username or email address *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                  />
                  <p className="mt-2 text-danger form_error_msg">
                    {errors?.email}
                  </p>
                </Form.Group>
                <Button
                  className="btn_submit"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? "Sending..." : "Reset Password"}
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ForgetPassword;
