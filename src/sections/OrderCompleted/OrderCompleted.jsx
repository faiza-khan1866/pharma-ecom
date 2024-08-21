import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { BsCheckCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./OrderCompleted.scss";

const OrderComplete = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="order_complete_wrape mb-60">
        <Row className="justify-content-center">
          <Col sm={8}>
            <div className="order_complete">
              <BsCheckCircle fontSize="80px" className="iconStyle" />
              <h2 className="title">Your order is completed!</h2>
              <p>
                Thank you for your order! Your order is being processed and will
                be completed within 3-6 hours. You will receive an email
                confirmation when your order is completed.
              </p>
              <Button className="btn_shop" onClick={() => navigate("/shop")}>
                Continue Shopping
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default OrderComplete;
