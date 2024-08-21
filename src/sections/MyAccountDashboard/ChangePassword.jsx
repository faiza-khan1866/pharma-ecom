import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { createChangePasswordData } from "../../http/apiService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  let userId = useSelector((state) => state.user.userData.id);
  let auth_token = useSelector((state) => state.user.auth_token);

  const initailObject = {
    user_id: userId,
    password: "",
    change_password: "",
    confirm_password: "",
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
      const response = await createChangePasswordData(updatedData, header);
      if (response.status === 200 || response.status === 201) {
        setLoading(false);
        if (response?.data?.[0] === 404) {
          toast.error(response.data.message);
        } else {
          toast.success(response.data.message);
          navigate("/account");
          setFormValues({ ...initailObject });
        }
      }
    } catch (error) {
      console.error("Error fetching Data:", error);
      setLoading(false);
      toast.error("Something Went wrong!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, change_password, confirm_password } = formValues;
    const errors = {};
    if (!password) {
      errors.password = "Please enter a Current password before submission";
    } else if (!change_password) {
      errors.change_password = "Please enter a New password before submission";
    } else if (change_password === password) {
      errors.change_password =
        "Current Password and New password cannot be same";
    } else if (!confirm_password) {
      errors.confirm_password =
        "Please enter a Confirm password before submission";
    } else if (change_password !== confirm_password) {
      errors.confirm_password =
        "New Password and Confirm Password does not match";
    } else if (change_password.length < 8) {
      errors.change_password = "Password must be at least 8 characters";
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
      <h4 className="title">Change Password</h4>
      <Form>
        <Form.Group controlId="password" className="mb-4">
          <Form.Label>
            Current password (leave blank to leave unchanged) *
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
          />
          <p className="mt-2 text-danger form_error_msg">{errors?.password}</p>
        </Form.Group>
        <Form.Group controlId="change_password" className="mb-4">
          <Form.Label>
            New password (leave blank to leave unchanged) *
          </Form.Label>
          <Form.Control
            type="password"
            name="change_password"
            value={formValues.change_password}
            onChange={handleInputChange}
          />
          <p className="mt-2 text-danger form_error_msg">
            {errors?.change_password}
          </p>
        </Form.Group>
        <Form.Group controlId="confirm_password" className="mb-4">
          <Form.Label>Confirm new password *</Form.Label>
          <Form.Control
            type="password"
            name="confirm_password"
            value={formValues.confirm_password}
            onChange={handleInputChange}
          />
          <p className="mt-2 text-danger form_error_msg">
            {errors?.confirm_password}
          </p>
        </Form.Group>
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

export default ChangePassword;
