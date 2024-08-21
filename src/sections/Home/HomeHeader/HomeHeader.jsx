import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner from "./../../../assets/images/banner/homebanner3.webp";
import "./HomeHeader.scss";

var settings = {
  dots: true,
  adaptiveHeight: true,
  autoplay: true,
  autoplaySpeed: 2000,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  lazyLoad: true,
  fade: true,
  arrows: false,
};

const HomeHeader = ({ bannerData }) => {
  const navigate = useNavigate();
  return (
    <Slider {...settings} className="bannerslider">
      {bannerData?.map((x, i) => (
        <div className="item" key={i}>
          <div
            className="home-header"
            style={{
              backgroundImage: x?.background_image
                ? `url(${
                    process.env.REACT_APP_IMAGE_BASE_URL + x?.background_image
                  })`
                : `url(${banner})`,
            }}
          >
            <div className="description-wrape">
              <h1 className="title" data-aos="fade-down" data-aos-once="true">
                {x?.title}
              </h1>
              <p className="detail" data-aos="fade-down" data-aos-once="true">
                {x?.sub_title}
              </p>
              <Button
                data-aos="fade-up"
                data-aos-once="true"
                className="shop-now-btn"
                onClick={() => navigate(`${x?.bannerBtn_Link}`)}
              >
                {x?.bannerBtn_text}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default HomeHeader;
