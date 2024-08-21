import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { createBlogCommentsData } from "../../http/apiService";
import { toast } from "react-toastify";
import "./CommentArea.scss";

const CommentArea = ({ blogId }) => {
  const initailObject = {
    first_name: "",
    email: "",
    blog_id: null,
    comment: "",
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

  const fetchCommentsFormData = async (updatedData) => {
    try {
      const response = await createBlogCommentsData(updatedData);
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
    const { first_name, email, comment } = formValues;
    const errors = {};
    if (!first_name) {
      errors.first_name = "Please Enter Name.";
    } else if (!email) {
      errors.email = "Please Enter Email.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "Invalid email address.";
    } else if (!comment) {
      errors.comment = "Please Enter Comment.";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false);
      return;
    }

    let updatedData = { ...formValues, blog_id: blogId };
    setLoading(true);
    fetchCommentsFormData(updatedData);
  };
  return (
    <div className="comments_wraper" data-aos="zoom-in" data-aos-once="true">
      <h2 className="comment_title" data-aos="fade-up" data-aos-once="true">
        Leave a Reply
      </h2>
      <p className="comment_subtitle" data-aos="fade-up" data-aos-once="true">
        Your email address will not be published. Required fields are marked *
      </p>
      <Form className="comment_form" data-aos="fade-up" data-aos-once="true">
        <Row>
          <Col sm={12}>
            <Form.Group controlId="comment" className="mb-4">
              <Form.Control
                as="textarea"
                name="comment"
                value={formValues.comment}
                onChange={handleInputChange}
                rows={12}
                style={{ resize: "none" }}
                placeholder="Comments *"
              />
              <p className="mt-2 text-danger form_error_msg">
                {errors?.comment}
              </p>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group controlId="first_name" className="mb-4">
              <Form.Control
                type="text"
                name="first_name"
                value={formValues.first_name}
                onChange={handleInputChange}
                placeholder="Name *"
              />
              <p className="mt-2 text-danger form_error_msg">
                {errors?.first_name}
              </p>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group controlId="email" className="mb-4">
              <Form.Control
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                placeholder="Email *"
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
          {loading ? "Sending..." : "Submit"}
        </Button>
      </Form>
    </div>
  );
};

export default CommentArea;
