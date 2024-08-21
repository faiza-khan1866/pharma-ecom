import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import login from "../../assets/images/icons/login.png";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-toastify";
import { createRegisterData } from "../../http/apiService";
import { useDispatch } from "react-redux";
import "./RegisterSection.scss";

const initailObject = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  mobile: "",
};

const RegisterSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState(initailObject);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
    // Clear error message when user starts typing again
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const fetchRegisterFormData = async (updatedData) => {
    try {
      const response = await createRegisterData(updatedData);
      if (response?.data?.errors) {
        setLoading(false);
        toast.error(response?.data?.errors?.email?.[0]);
      } else {
        setLoading(false);
        toast.success(response?.data?.message);
        setFormValues({ ...initailObject });
        dispatch({
          type: "user/showComponent",
          payload: true,
        });
        navigate("/verification");
      }
    } catch (error) {
      console.error("Error fetching Data:", error);
      setLoading(false);
      toast.error("Something Went wrong!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { first_name, last_name, email, mobile, password } = formValues;
    const errors = {};
    if (!first_name) {
      errors.first_name = "Please Enter First Name.";
    } else if (!last_name) {
      errors.last_name = "Please Enter Last Name.";
    } else if (!email) {
      errors.email = "Please Enter Email.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "Invalid email address.";
    } else if (!mobile) {
      errors.mobile = "Please Enter Phone Number.";
    } else if (!password) {
      errors.password = "Please Enter Password.";
    } else if (password.length < 8) {
      errors.password =
        "The password should be at least eight characters long.";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false);
      return;
    }

    let updatedData = { ...formValues };
    setLoading(true);
    fetchRegisterFormData(updatedData);
  };

  return (
    <div className="register_wrape mtb-60">
      <Container>
        <Row>
          <Col sm={12} lg={5}>
            <img
              src={login}
              alt="User"
              className="img-fluid"
              data-aos="fade-down"
              data-aos-once="true"
            />
          </Col>
          <Col sm>
            <h2
              className="main-title"
              data-aos="fade-down"
              data-aos-once="true"
            >
              Register
            </h2>
            <Form data-aos="fade-up" data-aos-once="true">
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
                      value={formValues.email}
                      onChange={handleInputChange}
                    />
                    <p className="mt-2 text-danger form_error_msg">
                      {errors?.email}
                    </p>
                  </Form.Group>
                </Col>
                <Col sm={12}>
                  <Form.Group controlId="password" className="mb-4">
                    <Form.Label>Password *</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formValues.password}
                        onChange={handleInputChange}
                      />
                      <InputGroup.Text>
                        {showPassword ? (
                          <AiOutlineEye
                            fontSize="20px"
                            onClick={togglePasswordVisibility}
                          />
                        ) : (
                          <AiOutlineEyeInvisible
                            fontSize="20px"
                            onClick={togglePasswordVisibility}
                          />
                        )}
                      </InputGroup.Text>
                    </InputGroup>
                    <p className="mt-2 text-danger form_error_msg">
                      {errors?.password}
                    </p>
                  </Form.Group>
                  <p className="pass_note">
                    Hint: The password should be at least eight characters long.
                    To make it stronger, use upper and lower case letters,
                    numbers, and symbols like ! " ? $ % ^ & ).
                  </p>
                </Col>
              </Row>
              <Button
                className="btn_submit"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Sending..." : "Register"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterSection;
