import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import refund from "./../../../assets/images/icons/refund.png";
import delivery from "./../../../assets/images/icons/delivery.png";
import support from "./../../../assets/images/icons/support.png";
import payment from "./../../../assets/images/icons/payment.png";
import { GeneralContext } from "../../../context/GeneralContext";
import "./Features.scss";

const Features = () => {
  const { countryData } = useContext(GeneralContext);
  const currency = countryData?.currency?.code;
  const featuredData = [
    {
      icon: refund,
      value: "Return Under 7 Days ",
      title: "Free Easy Return",
    },
    {
      icon: delivery,
      value: `Order Over ${currency} 499`,
      title: "Free Delivery",
    },
    {
      icon: support,
      value: "24/7 Support care",
      title: "All Day Support",
    },
    {
      icon: payment,
      value: "24/7 Support care",
      title: "Secure Payment",
    },
  ];
  return (
    <div className="mb-60">
      <Container>
        <Row>
          {featuredData?.map((x, i) => (
            <Col sm={6} lg={3} key={i} className="features_mbl_space">
              <div
                className="features-wrape"
                data-aos="zoom-in"
                data-aos-once="true"
              >
                <img src={x?.icon} alt="thumbnail" />
                <h2>{x?.title}</h2>
                <p>{x?.value}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Features;
