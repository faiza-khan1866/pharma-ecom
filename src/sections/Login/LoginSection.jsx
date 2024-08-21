import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import login from "../../assets/images/icons/login.png";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import ForgetPassword from "./ForgetPassword";
import { toast } from "react-toastify";
import { createLoginData, fetchUserData } from "../../http/apiService";
import { useDispatch } from "react-redux";
import { GeneralContext } from "../../context/GeneralContext";
import { useContext } from "react";
import "./LoginSection.scss";

const initailObject = {
  email: "",
  password: "",
  user_type: "user",
};

const LoginSection = () => {
  // const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  const { setUserData } = useContext(GeneralContext);
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

  const fetchLoginFormData = async (updatedData) => {
    try {
      const response = await createLoginData(updatedData);

      if (response?.data?.error) {
        setLoading(false);
        toast.error(response?.data?.error);
      } else {
        setLoading(false);
        dispatch({
          type: "user/loginUser",
          payload: {
            auth_token: response?.headers?.x_auth_token,
          },
        });

        setUserData({
          auth_token: response?.headers?.x_auth_token,
          isAuthenticated: true,
          pageShow: false,
          userData: {},
        });
        toast.success(response?.data?.success);
        setFormValues({ ...initailObject });

        const fetchDashboardData = async () => {
          let header = {
            headers: {
              Authorization: `Bearer ${response?.headers?.x_auth_token}`,
            },
          };
          try {
            const { data } = await fetchUserData(header);
            setUserData(data);
            dispatch({
              type: "user/userInfo",
              payload: data,
            });
          } catch (error) {
            console.error("Error fetching Data:", error);
          }
        };
        fetchDashboardData();
        // if (
        //   location?.pathname == "/cart" ||
        //   location?.pathname == "/checkout"
        // ) {
        //   navigate(-1);
        // } else {
        navigate("/account");
        // }
      }
    } catch (error) {
      console.error("Error fetching Data:", error);
      setLoading(false);
      toast.error("Something Went Wrong!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValues;
    const errors = {};
    if (!email) {
      errors.email = "Please Enter Email.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "Invalid email address.";
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
    fetchLoginFormData(updatedData);
  };

  return (
    <div className="login_wrape mtb-60">
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
              Login
            </h2>
            <Form data-aos="fade-up" data-aos-once="true">
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
              <Button
                className="btn_submit"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Sending..." : "Log in"}
              </Button>
            </Form>
            <span className="sign_up">
              Don’t have an account?
              <span onClick={() => navigate("/register")}>Signup Now</span>
            </span>
            <span className="lost_pass" onClick={() => setModalShow(true)}>
              Lost your password?
            </span>
          </Col>
        </Row>
        <ForgetPassword show={modalShow} onHide={() => setModalShow(false)} />
      </Container>
    </div>
  );
};

export default LoginSection;
