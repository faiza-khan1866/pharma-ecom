import React from "react";
import cardImg from "../../../assets/images/about/card.png";
import { Col, Row, Container } from "react-bootstrap";
import "./AboutUsDetails.scss";

const AboutUsDetails = ({ introData }) => {
  return (
    <div className="mb-60 about_details_wrape">
      <Container>
        <div className="d-flex justify-content-center align-items-center">
          <h1 className="main_title" data-aos="fade-down" data-aos-once="true">
            Begin Your Path to Good Health with MediExpress – Your Wellness
            Companion!
          </h1>
        </div>
        {introData?.map((x, index) => (
          <div className="card_detail_wrape" key={index}>
            <Row>
              <Col lg={{ span: 6, order: index % 2 !== 0 ? 2 : 1 }}>
                <figure data-aos="fade-down" data-aos-once="true">
                  <img
                    src={
                      x?.featured_img
                        ? process.env.REACT_APP_IMAGE_BASE_URL + x?.featured_img
                        : cardImg
                    }
                    alt="thumbnail"
                  />
                </figure>
              </Col>
              <Col lg={{ span: 6, order: index % 2 === 0 ? 2 : 1 }}>
                <div
                  className="cardDetail"
                  data-aos="fade-up"
                  data-aos-once="true"
                >
                  <h2 className="title">{x?.title}</h2>
                  <p
                    className="detials"
                    dangerouslySetInnerHTML={{ __html: x?.description }}
                  />
                </div>
              </Col>
            </Row>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default AboutUsDetails;
