import React from "react";
import payment from "../../assets/images/logo/payment.png";
import { Row, Col } from "react-bootstrap";
import "./FooterBottom.scss";

const FooterBottom = () => {
  return (
    <div className="footer-bottom-wrape">
      <Row>
        <Col sm={12} md={6}>
          <p>Copyright &copy; 2023 MediExpress. All Rights Reserved</p>
        </Col>
        <Col sm={12} md={6} className="payment-Wraper">
          <img src={payment} alt="payment" className="img-fluid" />
        </Col>
      </Row>
    </div>
  );
};

export default FooterBottom;
