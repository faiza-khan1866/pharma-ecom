import React, { useState } from "react";
import { createProductReviewData } from "../../../http/apiService";
import {
  Tab,
  Tabs,
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { Rate } from "antd";
import userProfile from "../../../assets/images/icons/userProfile.png";
import "./ProductInfoTabs.scss";

const ProductInfoTabs = ({ productData, scrollRef }) => {
  const initailObject = {
    name: "",
    email: "",
    rating: 4,
    product_id: null,
    message: "",
  };

  const [formValues, setFormValues] = useState(initailObject);
  const [loading, setLoading] = useState(false);
  const [newRating, setNewRating] = useState(4);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
    // Clear error message when user starts typing again
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const fetchProductReviewFormData = async (updatedData) => {
    try {
      const response = await createProductReviewData(updatedData);
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
    const { name, email, message } = formValues;
    const errors = {};
    if (!name) {
      errors.name = "Please Enter Name.";
    } else if (!email) {
      errors.email = "Please Enter Email.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "Invalid email address.";
    } else if (!message) {
      errors.message = "Please Enter Review.";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false);
      return;
    }

    let updatedData = {
      ...formValues,
      product_id: productData?.id,
      rating: newRating,
    };
    setLoading(true);
    fetchProductReviewFormData(updatedData);
  };

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <Container>
      <div
        ref={scrollRef}
        className="product-info-tabs-wrape mb-60"
        data-aos="fade-up"
        data-aos-once="true"
      >
        <Tabs
          defaultActiveKey="overview"
          id="product-info-tabs"
          className="mb-4"
        >
          <Tab eventKey="overview" title="Overview">
            <Row>
              <Col sm={12} lg={10}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: productData?.short_description,
                  }}
                />
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="description" title="Description">
            <Row>
              <Col sm={12} lg={10}>
                <p
                  dangerouslySetInnerHTML={{ __html: productData?.description }}
                />
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="additional-info" title="Additional Information">
            <p
              dangerouslySetInnerHTML={{
                __html: productData?.additional_information,
              }}
            />
          </Tab>
          <Tab
            eventKey="reviews"
            title={`Reviews (${productData?.review?.length})`}
          >
            <div className="review_wraper">
              <h2 className="title">Leave a review</h2>
              <p className="rating">
                <Rate
                  allowHalf
                  onChange={setNewRating}
                  value={newRating}
                  className="rat_icon"
                />
              </p>
              <Form className="review_form">
                <Row>
                  <Col sm={12} lg={6}>
                    <Form.Group controlId="name" className="mb-4">
                      <Form.Control
                        type="text"
                        name="name"
                        value={formValues.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                      />
                      <p className="mt-2 text-danger form_error_msg">
                        {errors?.name}
                      </p>
                    </Form.Group>
                  </Col>
                  <Col sm={12} lg={6}>
                    <Form.Group controlId="email" className="mb-4">
                      <Form.Control
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                      />
                      <p className="mt-2 text-danger form_error_msg">
                        {errors?.email}
                      </p>
                    </Form.Group>
                  </Col>
                  <Col sm={12}>
                    <Form.Group controlId="message" className="mb-4">
                      <Form.Control
                        as="textarea"
                        name="message"
                        value={formValues.message}
                        onChange={handleInputChange}
                        rows={12}
                        style={{ resize: "none" }}
                        placeholder="Type Your Review"
                      />
                      <p className="mt-2 text-danger form_error_msg">
                        {errors?.message}
                      </p>
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  className="btn_submit"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? "Sending" : "Post review"}
                </Button>
              </Form>
            </div>
            {productData?.review?.length > 0 && (
              <div className="single_review_wraper">
                <Table responsive>
                  {productData?.review?.map((x, index) => (
                    <tr key={index}>
                      <td>
                        <img src={userProfile} alt="User" />
                      </td>
                      <td>
                        <h2 className="name">
                          {x?.name} <br />{" "}
                          {new Date(x?.created_at)?.toLocaleDateString(
                            "en-US",
                            options
                          )}
                        </h2>
                      </td>
                      <td>
                        <p className="rating">
                          <Rate
                            allowHalf
                            disabled
                            defaultValue={x?.rating}
                            className="rat_icon"
                          />
                        </p>
                      </td>
                      <td className="review_div">
                        <p className="review">{x?.message}</p>
                      </td>
                    </tr>
                  ))}
                </Table>
              </div>
            )}
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};

export default ProductInfoTabs;
