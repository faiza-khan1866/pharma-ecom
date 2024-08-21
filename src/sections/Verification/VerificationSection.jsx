import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import verification from "../../assets/images/icons/verification.png";
import { toast } from "react-toastify";
import { createVerificationData } from "../../http/apiService";
import { useSelector, useDispatch } from "react-redux";
import "./VerificationSection.scss";

const initailObject = {
  code: "",
};

const VerificationSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(initailObject);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  let pageShow = useSelector((state) => state.user.pageShow);
  const [IsNavigatePage, setIsNavigatePage] = useState(false);

  useEffect(() => {
    if (pageShow === false && IsNavigatePage === false) {
      navigate(-1);
    }
  }, [pageShow]);

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
    // Clear error message when user starts typing again
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const fetchVerificationFormData = async (updatedData) => {
    try {
      const response = await createVerificationData(updatedData);
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

        toast.success(response?.data?.success);
        setFormValues({ ...initailObject });
        setIsNavigatePage(true);
        //timeout fn start
        setTimeout(() => {
          navigate("/account");
          dispatch({
            type: "user/showComponent",
            payload: false,
          });
        }, 2000);
        //timeout fn end
      }
    } catch (error) {
      console.error("Error fetching Data:", error);
      setLoading(false);
      toast.error("Something Went wrong!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { code } = formValues;
    const errors = {};

    if (!code) {
      errors.code = "Please Enter Authorization Code.";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false);
      return;
    }

    let updatedData = { ...formValues };
    setLoading(true);
    fetchVerificationFormData(updatedData);
  };

  return (
    <div className="verification_wrape mtb-60">
      <Container>
        <Row>
          <Col sm={12} lg={5}>
            <img
              src={verification}
              alt="user"
              className="img-fluid"
              data-aos="fade-down"
              data-aos-once="true"
            />
          </Col>
          <Col sm>
            <h2 className="main-title" data-aos="fade-up" data-aos-once="true">
              Authenticate your account
            </h2>
            <p className="code_note" data-aos="fade-up" data-aos-once="true">
              Protecting your account is our top priority. Please confirm your
              account by entering the authorization code sent to in your email.
            </p>
            <Form data-aos="fade-up" data-aos-once="true">
              <Form.Group controlId="code" className="mb-4">
                <Form.Label>Authorization Code *</Form.Label>
                <Form.Control
                  type="number"
                  name="code"
                  placeholder="0000"
                  value={formValues.code}
                  onChange={handleInputChange}
                />
                <p className="mt-2 text-danger form_error_msg">
                  {errors?.code}
                </p>
              </Form.Group>
              <Button
                className="btn_submit"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Sending..." : "Submit"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VerificationSection;
