import React from "react";
import { Container } from "react-bootstrap";
import bgImg from "../../../assets/images/home/promobg.jpg";
import "./CodeDeal.scss";

const CodeDeal = ({ promoCodeData }) => {
  return (
    <Container>
      <div
        className="code_deal_wrape mb-60"
        data-aos="fade-up"
        data-aos-once="true"
        style={{
          backgroundImage:
            // promoCodeData?.BannerImage
            //   ? `url(${
            //       process.env.REACT_APP_IMAGE_BASE_URL +
            //       promoCodeData?.BannerImage
            //     })`
            //   :
            `url(${bgImg})`,
        }}
      >
        <div className="detail_wrape">
          <span className="code">CODE : {promoCodeData?.promoCode} </span>
          <p>{promoCodeData?.title}</p>
          <h2
            dangerouslySetInnerHTML={{ __html: promoCodeData?.description }}
          />

          {/*             
          <span>70% Off Big Sale</span> Prescription medicines & Medical
            Equipment */}
        </div>
      </div>
    </Container>
  );
};

export default CodeDeal;
