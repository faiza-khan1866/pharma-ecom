import React, { useEffect, useState } from "react";
import { Field } from "formik";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Col, Row } from "react-bootstrap";
import "./CheckoutForm.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../../features/user/userSlice";
import {
  createAddAddressData,
  updateAddressData,
  fetchSingleAddressData,
} from "../../../http/apiService";

function CheckoutForm({
  AddAddress,
  setAddress,
  editAddressId,
  setEditAddressId,
}) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userData.id);
  const auth_token = useSelector((state) => state.user.auth_token);

  const initialObject = {
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

  const [formValues, setFormValues] = useState(initialObject);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAddressDetailData = async () => {
      try {
        let header = {
          headers: {
            Authorization: `Bearer ${auth_token}`,
          },
        };
        const { data } = await fetchSingleAddressData(editAddressId, header);
        setFormValues(data);
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };

    if (editAddressId && editAddressId != null) {
      setIsEdit(true);
      fetchAddressDetailData();
    } else {
      setIsEdit(false);
      setFormValues(initialObject);
    }
  }, [editAddressId, auth_token, userId]);

  const phoneRegExp = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const BillingDetails = Yup.object().shape({
    full_name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string()
      .matches(emailRegExp, "Email is not valid")
      .required("Required"),
    mobile: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required"),
    country: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    state: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    city: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    postal_code: Yup.string()
      .min(4, "Too Short!")
      .max(10, "Too Long!")
      .required("Required"),
    address_line1: Yup.string()
      .min(10, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    address_type: Yup.string().required("Required"),
  });

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
        setAddress(false);
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
        setAddress(false);
        setEditAddressId(null);
      }
    } catch (error) {
      console.error("Error fetching Data:", error);
      setLoading(false);
      toast.error("Something Went wrong!");
    }
  };

  const handleAddressSubmit = (billing_values) => {
    console.log(billing_values, "checkout address");
    setLoading(true);
    if (isEdit) {
      let updatedData = {
        id: formValues?.id,
        user_id: billing_values?.user_id,
        full_name: billing_values?.full_name,
        email: billing_values?.email,
        mobile: billing_values?.mobile,
        country: billing_values?.country,
        city: billing_values?.city,
        state: billing_values?.state,
        postal_code: billing_values?.postal_code,
        address_line1: billing_values?.address_line1,
        address_line2: billing_values?.address_line2,
        address_type: billing_values?.address_type,
      };
      updateAddressFormData(updatedData);
    } else {
      let updatedData = {
        user_id: billing_values?.user_id,
        full_name: billing_values?.full_name,
        email: billing_values?.email,
        mobile: billing_values?.mobile,
        country: billing_values?.country,
        city: billing_values?.city,
        state: billing_values?.state,
        postal_code: billing_values?.postal_code,
        address_line1: billing_values?.address_line1,
        address_line2: billing_values?.address_line2,
        address_type: billing_values?.address_type,
      };
      addAddressFormData(updatedData);
    }
  };

  return (
    <div
      className="checkout_form_wrapper"
      data-aos="zoom-in"
      data-aos-once="true"
    >
      <h2 className="form_title">{isEdit ? "Edit" : "Add"} Billing Details</h2>
      <Formik
        key={isEdit ? formValues.id : "add"}
        initialValues={formValues}
        enableReinitialize={true}
        validationSchema={BillingDetails}
        onSubmit={(values) => {
          handleAddressSubmit(values);
        }}
      >
        {({ values, errors, touched, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="billing_Form_Wrapper">
              <Row>
                <Col lg={6}>
                  <div className="mb-1 form_field_Wrapper">
                    <label className="form-label">Full Name *</label>
                    <Field name="full_name" className="form-control" />
                    <div className="Error-Message">
                      {errors.full_name && touched.full_name ? (
                        <div>{errors.full_name}</div>
                      ) : null}
                    </div>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-1 form_field_Wrapper">
                    <label className="form-label">Email *</label>
                    <Field name="email" type="email" className="form-control" />
                    <div className="Error-Message">
                      {errors.email && touched.email ? (
                        <div>{errors.email}</div>
                      ) : null}
                    </div>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-1 form_field_Wrapper">
                    <label className="form-label">Phone No *</label>
                    <Field
                      name="mobile"
                      type="number"
                      className="form-control"
                    />
                    <div className="Error-Message">
                      {errors.mobile && touched.mobile ? (
                        <div>{errors.mobile}</div>
                      ) : null}
                    </div>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-1 form_field_Wrapper">
                    <label className="form-label">Country *</label>
                    <Field
                      name="country"
                      type="text"
                      className="form-control"
                    />
                    <div className="Error-Message">
                      {errors.country && touched.country ? (
                        <div>{errors.country}</div>
                      ) : null}
                    </div>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-1 form_field_Wrapper">
                    <label className="form-label">State *</label>
                    <Field name="state" type="text" className="form-control" />
                    <div className="Error-Message">
                      {errors.state && touched.state ? (
                        <div>{errors.state}</div>
                      ) : null}
                    </div>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-1 form_field_Wrapper">
                    <label className="form-label">Town/City *</label>
                    <Field name="city" type="text" className="form-control" />
                    <div className="Error-Message">
                      {errors.city && touched.city ? (
                        <div>{errors.city}</div>
                      ) : null}
                    </div>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-1 form_field_Wrapper">
                    <label className="form-label">Postal Code *</label>
                    <Field
                      name="postal_code"
                      type="number"
                      className="form-control"
                    />
                    <div className="Error-Message">
                      {errors.postal_code && touched.postal_code ? (
                        <div>{errors.postal_code}</div>
                      ) : null}
                    </div>
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="mb-1 form_field_Wrapper">
                    <label className="form-label">Address *</label>
                    <Field
                      name="address_line1"
                      type="text"
                      className="form-control"
                    />
                    <div className="Error-Message">
                      {errors.address_line1 && touched.address_line1 ? (
                        <div>{errors.address_line1}</div>
                      ) : null}
                    </div>
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="mb-1 form_field_Wrapper">
                    <label className="form-label">
                      Additional Address Details
                    </label>
                    <Field
                      name="address_line2"
                      type="text"
                      className="form-control"
                    />
                    <div className="Error-Message">
                      {errors.address_line2 && touched.address_line2 ? (
                        <div>{errors.address_line2}</div>
                      ) : null}
                    </div>
                  </div>
                </Col>
                <Col lg={12}>
                  <div className="mb-1 form_field_Wrapper">
                    <label className="form-label">Address Type *</label>
                    <br />
                    <label>
                      <Field
                        type="radio"
                        name="address_type"
                        className="radio_field_control form-check-input"
                        value="Billing"
                        checked={values.address_type === "Billing"}
                      />
                      Billing
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="address_type"
                        className="radio_field_control form-check-input"
                        value="Shipping"
                        checked={values.address_type === "Shipping"}
                      />
                      Shipping
                    </label>
                    <div className="Error-Message">
                      {errors.address_type && touched.address_type ? (
                        <div>{errors.address_type}</div>
                      ) : null}
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="d-flex justify-content-around">
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setAddress(false);
                        setEditAddressId(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Save"}
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CheckoutForm;
