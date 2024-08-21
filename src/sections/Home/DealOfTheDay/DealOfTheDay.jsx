import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import deal from "../../../assets/images/deals/deal1.png";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Rate } from "antd";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import useCart from "../../../hooks/useCart";
import "./DealOfTheDay.scss";

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
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 2,
  lazyLoad: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const DealOfTheDay = ({ productDealsData }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="deal_of_the_day_wraper mb-60">
      <Container>
        <h2 data-aos="fade-down" data-aos-once="true">
          Deal Of The Day
        </h2>
        <Slider {...settings}>
          {productDealsData?.map((x, i) => (
            <div key={i} className="container-fluid">
              <div
                className="deals_wraper"
                data-aos="zoom-in"
                data-aos-once="true"
              >
                <Row className="align-items-center">
                  <Col sm={12} lg={6}>
                    <figure>
                      <img
                        src={
                          x?.featured_img
                            ? process.env.REACT_APP_IMAGE_BASE_URL +
                              x?.featured_img
                            : deal
                        }
                        alt="thumbnail"
                      />
                      {x?.price?.[0]?.deal_price != 0 ? (
                        <span className="discount">
                          {Math.round(
                            ((parseFloat(x?.price?.[0]?.actual_price) -
                              parseFloat(x?.price?.[0]?.deal_price)) /
                              parseFloat(x?.price?.[0]?.actual_price)) *
                              100
                          )}
                          % off
                        </span>
                      ) : null}
                    </figure>
                  </Col>
                  <Col sm={12} lg={6}>
                    <div className="detail_wraper">
                      <p className="category">
                        {x?.category?.map((t, index) => (
                          <span key={index}>
                            {t?.name}
                            {index === x?.category.length - 1 ? "" : ", "}
                          </span>
                        ))}
                      </p>

                      <h3 onClick={() => navigate(`/product/${x?.route}`)}>
                        {x?.name}
                      </h3>

                      <p className="price">
                        {x?.price?.[0]?.country?.currency}{" "}
                        {x?.price?.[0]?.deal_price != 0
                          ? x?.price?.[0]?.deal_price
                          : x?.price?.[0]?.actual_price}{" "}
                        {x?.price?.[0]?.deal_price != 0 ? (
                          <del>
                            {x?.price?.[0]?.country?.currency}{" "}
                            {x?.price?.[0]?.actual_price}
                          </del>
                        ) : (
                          ""
                        )}
                      </p>

                      {x?.review != 0 && (
                        <p className="rating">
                          <Rate
                            disabled
                            allowHalf
                            defaultValue={x?.review}
                            className="rat_icon"
                          />
                        </p>
                      )}

                      <Button
                        className="add_cart_btn"
                        onClick={() => {
                          addToCart(x, x?.price?.[0]);
                        }}
                      >
                        Add to cart
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </div>
  );
};

export default DealOfTheDay;
