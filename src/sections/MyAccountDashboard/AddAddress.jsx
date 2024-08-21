import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  createAddAddressData,
  updateAddressData,
  fetchSingleAddressData,
} from "../../http/apiService";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const AddAddress = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  let userId = useSelector((state) => state.user.userData.id);
  let auth_token = useSelector((state) => state.user.auth_token);

  const initailObject = {
    user_id: userId,
    full_name: "",
    email: "",
    mobile: "",
    country: "",
    city: "",
    state: "",
    postal_code: "",
    address_line1: "",
    address_line2: "",
    address_type: "",
  };

  const [formValues, setFormValues] = useState(initailObject);
  const [isEdit, setIsEdit] = useState(false);
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

  useEffect(() => {
    const fetchAddressDetailData = async () => {
      try {
        let header = {
          headers: {
            Authorization: `Bearer ${auth_token}`,
          },
        };
        const { data } = await fetchSingleAddressData(id, header);
        setFormValues(data);
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };

    if (id && id != null) {
      setIsEdit(true);
      fetchAddressDetailData();
    }
  }, [id]);

  const addAddressFormData = async (updatedData) => {
    try {
      let header = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      };
      const response = await createAddAddressData(updatedData, header);
      if (response.status === 200 || response.status === 201) {
        setLoading(false);
        toast.success("Address has been Added Successfully!");
        navigate("/account/address");
        setFormValues({ ...initailObject });
      }
    } catch (error) {
      console.error("Error fetching Data:", error);
      setLoading(false);
      toast.error("Something Went wrong!");
    }
  };

  const updateAddressFormData = async (updatedData) => {
    try {
      let header = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      };
      const response = await updateAddressData(updatedData, header);
      if (response.status === 200 || response.status === 201) {
        setLoading(false);
        toast.success("Address has been Updated Successfully!");
        navigate("/account/address");
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
    const {
      full_name,
      email,
      mobile,
      country,
      state,
      city,
      postal_code,
      address_line1,
      address_type,
    } = formValues;
    const errors = {};
    if (!full_name) {
      errors.full_name = "Please Enter Full Name.";
    } else if (!email) {
      errors.email = "Please Enter Email.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "Invalid email address.";
    } else if (!mobile) {
      errors.mobile = "Please Enter Phone Number.";
    } else if (!country) {
      errors.country = "Please Enter Country.";
    } else if (!state) {
      errors.state = "Please Enter State.";
    } else if (!city) {
      errors.city = "Please Enter City.";
    } else if (!postal_code) {
      errors.postal_code = "Please Postal Code.";
    } else if (!address_line1) {
      errors.address_line1 = "Please Enter Address.";
    } else if (!address_type) {
      errors.address_type = "Please Choose Address Type.";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false);
      return;
    }

    let updatedData = { ...formValues };
    setLoading(true);
    if (isEdit) {
      updateAddressFormData(updatedData);
    } else {
      addAddressFormData(updatedData);
    }
  };
  return (
    <div className="account_details_wrape">
      <h4 className="title">{isEdit ? "Update" : "Add"} Address</h4>
      <Form>
        <Row>
          <Col sm={6}>
            <Form.Group controlId="full_name" className="mb-4">
              <Form.Label>Full Name *</Form.Label>
              <Form.Control
                type="text"
                name="full_name"
                value={formValues.full_name}
                onChange={handleInputChange}
              />
              <p className="mt-2 text-danger form_error_msg">
                {errors?.full_name}
              </p>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group controlId="email" className="mb-4">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
              />
              <p className="mt-2 text-danger form_error_msg">{errors?.email}</p>
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
            <Form.Group controlId="country" className="mb-4">
              <Form.Label>Country *</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={formValues.country}
                onChange={handleInputChange}
              />
              <p className="mt-2 text-danger form_error_msg">
                {errors?.country}
              </p>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group controlId="state" className="mb-4">
              <Form.Label>State *</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={formValues.state}
                onChange={handleInputChange}
              />
              <p className="mt-2 text-danger form_error_msg">{errors?.state}</p>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group controlId="city" className="mb-4">
              <Form.Label>Town/City *</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formValues.city}
                onChange={handleInputChange}
              />
              <p className="mt-2 text-danger form_error_msg">{errors?.city}</p>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group controlId="postal_code" className="mb-4">
              <Form.Label>Postal Code *</Form.Label>
              <Form.Control
                type="text"
                name="postal_code"
                value={formValues.postal_code}
                onChange={handleInputChange}
              />
              <p className="mt-2 text-danger form_error_msg">
                {errors?.postal_code}
              </p>
            </Form.Group>
          </Col>
          <Col sm={12}>
            <Form.Group controlId="address_line1" className="mb-4">
              <Form.Label>Address *</Form.Label>
              <Form.Control
                type="text"
                name="address_line1"
                value={formValues.address_line1}
                onChange={handleInputChange}
              />
              <p className="mt-2 text-danger form_error_msg">
                {errors?.address_line1}
              </p>
            </Form.Group>
          </Col>
          <Col sm={12}>
            <Form.Group controlId="address_line2" className="mb-4">
              <Form.Label>Additional Address Details</Form.Label>
              <Form.Control
                type="text"
                name="address_line2"
                value={formValues.address_line2}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col sm={12}>
            <Form.Group controlId="address_type" className="mb-4">
              <Form.Label style={{ display: "block" }}>Address Type</Form.Label>
              <Form.Check
                type="radio"
                name="address_type"
                inline
                label="Billing"
                value="Billing"
                onChange={handleInputChange}
                checked={formValues.address_type == "Billing"}
              />
              <Form.Check
                type="radio"
                name="address_type"
                inline
                label="Shipping"
                value="Shipping"
                onChange={handleInputChange}
                checked={formValues.address_type == "Shipping"}
              />
              <p className="mt-2 text-danger form_error_msg">
                {errors?.address_type}
              </p>
            </Form.Group>
          </Col>
        </Row>
        <Button
          className="btn_submit"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Sending..." : "Save"}
        </Button>
      </Form>
    </div>
  );
};

export default AddAddress;
