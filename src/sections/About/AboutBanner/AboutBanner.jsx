import React from "react";
import { Container, Button } from "react-bootstrap";
import logo from "../../../assets/images/logo/logo.png";
import { MdCoronavirus } from "react-icons/md";
import { TbCertificate } from "react-icons/tb";
import bannerImg from "../../../assets/images/banner/aboutbanner.png";
import "./AboutBanner.scss";

const AboutBanner = ({ bannerData }) => {
  return (
    <Container>
      <div
        className="banner_wrapper mtb-60 ptb-60"
        style={{
          backgroundImage: bannerData?.background_image
            ? `url(${
                process.env.REACT_APP_IMAGE_BASE_URL +
                bannerData?.background_image
              })`
            : `url(${bannerImg})`,
        }}
      >
        <div
          className="bannerDetails"
          data-aos="fade-down"
          data-aos-once="true"
        >
          <img className="img-fluid logo" src={logo} />
          <h1
            className="title"
            dangerouslySetInnerHTML={{ __html: bannerData?.title }}
          />
          {/* <div className="timing">
            <p className="timing_para">
              <MdCoronavirus fontSize="24px" /> Up to 5 users simultaneously
            </p>
            <p className="timing_para">
              <TbCertificate fontSize="24px" /> Has HEALTH certificate
            </p>
          </div> */}
          {/* <Button className="about_btn">About</Button> */}
        </div>
      </div>
    </Container>
  );
};

export default AboutBanner;
