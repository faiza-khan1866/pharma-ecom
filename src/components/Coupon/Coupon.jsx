import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./Coupon.scss";

function Coupon() {
  return (
    <div
      className="coupon_wrape mb-4"
      data-aos="fade-down"
      data-aos-once="true"
    >
      <h4 className="titleCoupon mb-4">
        If you have a coupon code, apply it below
      </h4>
      <Form>
        <Row>
          <Col sm={5}>
            <Form.Group controlId="name">
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your Coupon Code"
              />
            </Form.Group>
          </Col>
          <Col sm>
            <Button className="coupon_apply-btn">Apply Code</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Coupon;
