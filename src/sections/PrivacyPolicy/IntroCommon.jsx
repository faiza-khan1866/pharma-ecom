import React from "react";
import { Container } from "react-bootstrap";
import "./IntroCommon.scss";

const IntroCommon = ({ introData }) => {
  return (
    <div className="intro-common-wrape mb-60">
      <Container>
        <h2 className="title" data-aos="fade-down" data-aos-once="true">
          {introData?.title}
        </h2>
        <p
          data-aos="fade-down"
          data-aos-once="true"
          className="description"
          dangerouslySetInnerHTML={{ __html: introData?.description }}
        />
      </Container>
    </div>
  );
};

export default IntroCommon;
