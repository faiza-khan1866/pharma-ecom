import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import brand1 from "../../../assets/images/brands/brand1.png";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import "./TopBrands.scss"

function NextArrow(props) {
  const { onClick } = props;
  return (
    <button className="nextArrow_wrape" onClick={onClick}>
      <HiOutlineArrowSmRight fontSize={"24px"} />
    </button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button className="prevArrow_wrape" onClick={onClick}>
      <HiOutlineArrowSmLeft fontSize={"24px"} />
    </button>
  );
}

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  lazyLoad: true,
  nextArrow: false,
  prevArrow: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
      },
    },
  ],
};

const TopBrands = ({ topBrandsData }) => {
  // const navigate = useNavigate();
  return (
    <div className="top_brand_wraper mtb-60">
      <Container>
        <h2 data-aos="fade-down" data-aos-once="true">
          Best Selling Brands
        </h2>
        <Slider {...settings}>
          {topBrandsData?.map((x, i) => (
            <div key={i} className="container-fluid">
              <div
                data-aos="fade-up"
                data-aos-once="true"
                className="img_wraper"
                // onClick={() => navigate(`/${x?.best_selling_route}`)}
              >
                <img
                  className="img-fluid"
                  src={
                    x?.featured_img
                      ? process.env.REACT_APP_IMAGE_BASE_URL + x?.featured_img
                      : brand1
                  }
                  alt="thumbnail"
                />
                <div className="detail_wraper">
                  <h3>{x?.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </div>
  );
};

export default TopBrands;
