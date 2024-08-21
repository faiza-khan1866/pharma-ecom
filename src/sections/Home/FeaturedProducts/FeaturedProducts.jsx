import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { Rate } from "antd";
import product from "./../../../assets/images/products/product2.png";
import { AiOutlineShopping, AiOutlineHeart } from "react-icons/ai";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import useCart from "../../../hooks/useCart";
import useWishlist from "../../../hooks/useWishlist";
import "./FeaturedProducts.scss";

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
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  lazyLoad: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  infinite: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 767,
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

const FeaturedProducts = ({ featuredData }) => {
  const navigate = useNavigate();
  // useCart
  const { addToCart } = useCart();
  const { addtoWishList } = useWishlist();

  return (
    <div className="feature-products-wrape mb-60">
      <Container>
        <h2 data-aos="fade-down" data-aos-once="true">
          {/* Most Purchased Product */}
          Best Selling Products
        </h2>
        <Slider {...settings}>
          {featuredData?.map((x, i) => (
            <div key={i} className="container-fluid">
              <div
                className="feature-products"
                data-aos="zoom-in"
                data-aos-once="true"
              >
                <div
                  className="image-box"
                  onClick={() => navigate(`/product/${x?.route}`)}
                >
                  <figure>
                    <img
                      src={
                        x?.featured_img
                          ? process.env.REACT_APP_IMAGE_BASE_URL +
                            x?.featured_img
                          : product
                      }
                      alt="thumbnail"
                      className="img-fluid mainImg"
                    />
                  </figure>
                  {x?.price?.[0]?.sale_price != 0 ||
                  x?.price?.[0]?.deal_price != 0 ? (
                    <span className="discount">
                      {Math.round(
                        ((parseFloat(x?.price?.[0]?.actual_price) -
                          (parseFloat(x?.price?.[0]?.deal_price) ||
                            parseFloat(x?.price?.[0]?.sale_price))) /
                          parseFloat(x?.price?.[0]?.actual_price)) *
                          100
                      )}
                      % off
                    </span>
                  ) : null}
                </div>
                <h3 onClick={() => navigate(`/product/${x?.route}`)}>
                  {x?.name}
                </h3>
                <p className="cat_title">
                  {x?.category?.map((t, index) => (
                    <span key={index}>
                      {t?.name}
                      {index === x?.category?.length - 1 ? "" : ", "}
                    </span>
                  ))}
                </p>
                <div className="price_wraper">
                  <div>
                    <p className="price">
                      {x?.price?.[0]?.country?.currency}{" "}
                      {x?.price?.[0]?.sale_price != 0
                        ? x?.price?.[0]?.sale_price
                        : x?.price?.[0]?.deal_price != 0
                        ? x?.price?.[0]?.deal_price
                        : x?.price?.[0]?.actual_price}{" "}
                      {x?.price?.[0]?.deal_price != 0 ||
                      x?.price?.[0]?.sale_price != 0 ? (
                        <del>
                          {x?.price?.[0]?.country?.currency}{" "}
                          {x?.price?.[0]?.actual_price}
                        </del>
                      ) : (
                        ""
                      )}
                    </p>
                    {x?.review !== 0 && (
                      <p className="rating">
                        <Rate
                          disabled
                          allowHalf
                          defaultValue={x?.review}
                          className="rat_icon"
                        />
                      </p>
                    )}
                  </div>
                  <Button
                    className="add_cart_btn"
                    onClick={() => addToCart(x, x?.price?.[0])}
                  >
                    <AiOutlineShopping className="cart_icon" />
                  </Button>
                </div>
                <div className="hover_product_wrape">
                  <div className="whishlist_wrape">
                    <Button
                      className="eye_icon_wrape"
                      onClick={() => addtoWishList(x)}
                    >
                      <AiOutlineHeart className="eye_icon" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </div>
  );
};

export default FeaturedProducts;
