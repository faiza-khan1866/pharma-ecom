import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { createUpdateProfileData } from "../../http/apiService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AccountDetails = () => {
  const navigate = useNavigate();
  let userData = useSelector((state) => state.user.userData);
  let auth_token = useSelector((state) => state.user.auth_token);

  const initailObject = {
    user_id: userData?.id,
    first_name: userData?.first_name,
    last_name: userData?.last_name,
    mobile: userData?.mobile,
    email: userData?.email,
  };
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

  const fetchUpdateProfileFormData = async (updatedData) => {
    try {
      let header = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      };
      const response = await createUpdateProfileData(updatedData, header);
      if (response.status === 200 || response.status === 201) {
        setLoading(false);
        toast.success(response.data.message);
        navigate("/account");
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
    const { first_name, last_name, email, mobile } = formValues;
    const errors = {};
    if (!first_name) {
      errors.first_name = "Please enter a first name before updating profile";
    } else if (!last_name) {
      errors.last_name = "Please enter a last name before updating profile";
    } else if (!mobile) {
      errors.mobile = "Please enter a phone number before updating profile";
    } else if (!email) {
      errors.email = "Please enter an email id before updating profile";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false);
      return;
    }

    let updatedData = { ...formValues };
    setLoading(true);
    fetchUpdateProfileFormData(updatedData);
  };
  return (
    <div className="account_details_wrape">
      <h4 className="title">Account Details</h4>
      <Form>
        <Row>
          <Col sm={6}>
            <Form.Group controlId="first_name" className="mb-4">
              <Form.Label>First Name *</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={formValues.first_name}
                onChange={handleInputChange}
              />
              <p className="mt-2 text-danger form_error_msg">
                {errors?.first_name}
              </p>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group controlId="last_name" className="mb-4">
              <Form.Label>Last Name *</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={formValues.last_name}
                onChange={handleInputChange}
              />
              <p className="mt-2 text-danger form_error_msg">
                {errors?.last_name}
              </p>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group controlId="mobile" className="mb-4">
              <Form.Label>Phone Number *</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                value={formValues.mobile}
                onChange={handleInputChange}
              />
              <p className="mt-2 text-danger form_error_msg">
                {errors?.mobile}
              </p>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group controlId="email" className="mb-4">
              <Form.Label>Email Address *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formValues?.email}
                readOnly
              />
              <p className="mt-2 text-danger form_error_msg">{errors?.email}</p>
            </Form.Group>
          </Col>
        </Row>
        <Button
          className="btn_submit"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Sending..." : "Save Changes"}
        </Button>
      </Form>
    </div>
  );
};

export default AccountDetails;
