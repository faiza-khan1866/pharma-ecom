import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineShopping,
  AiOutlineHeart,
  AiOutlineEye,
} from "react-icons/ai";
import product from "./../../../assets/images/products/product2.png";
import { Rate } from "antd";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import ProductQuickView from "../../Products/ProductQuickView";
import useCart from "../../../hooks/useCart";
import "./RelatedProducts.scss";

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

const RelatedProducts = ({ relatedProducts }) => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  const [productID, setProductID] = React.useState(null);
  const [country, setCountry] = React.useState("");

  // useCart
  const { addToCart } = useCart();

  return (
    <Container>
      <div className="related-products-wrape mb-60">
        <h2 className="main-title" data-aos="fade-down" data-aos-once="true">
          Related Products
        </h2>

        <Slider {...settings}>
          {relatedProducts
            ?.filter((product) => product?.products?.price?.length > 0)
            ?.map((x, i) => (
              <div className="container-fluid">
                <div
                  className="product-item"
                  key={i}
                  data-aos="zoom-in"
                  data-aos-once="true"
                >
                  <div
                    className="image-box"
                    onClick={() => navigate(`/product/${x?.products?.route}`)}
                  >
                    <figure>
                      <img
                        src={
                          x?.products?.featured_img
                            ? process.env.REACT_APP_IMAGE_BASE_URL +
                              x?.products?.featured_img
                            : product
                        }
                        alt="thumbnail"
                        className="img-fluid mainImg"
                      />
                    </figure>
                    {x?.products?.price?.[0]?.sale_price != 0 ||
                    x?.products?.price?.[0]?.deal_price != 0 ? (
                      <span className="discount">
                        {Math.round(
                          ((parseFloat(x?.products?.price?.[0]?.actual_price) -
                            (parseFloat(x?.products?.price?.[0]?.deal_price) ||
                              parseFloat(
                                x?.products?.price?.[0]?.sale_price
                              ))) /
                            parseFloat(x?.products?.price?.[0]?.actual_price)) *
                            100
                        )}
                        % off
                      </span>
                    ) : null}
                  </div>
                  <h3
                    onClick={() => navigate(`/product/${x?.products?.route}`)}
                  >
                    {x?.products?.name}
                  </h3>
                  <p className="cat_title">
                    {x?.products?.category?.map((t, index) => (
                      <span key={index}>
                        {t?.name}
                        {index === x?.products?.category?.length - 1
                          ? ""
                          : ", "}
                      </span>
                    ))}
                  </p>
                  <div className="price_wraper">
                    <div>
                      <p className="price">
                        {x?.products?.price?.[0]?.country?.currency}{" "}
                        {x?.products?.price?.[0]?.sale_price != 0
                          ? x?.products?.price?.[0]?.sale_price
                          : x?.products?.price?.[0]?.deal_price != 0
                          ? x?.products?.price?.[0]?.deal_price
                          : x?.products?.price?.[0]?.actual_price}{" "}
                        {x?.products?.price?.[0]?.deal_price != 0 ||
                        x?.products?.price?.[0]?.sale_price != 0 ? (
                          <del>
                            {x?.products?.price?.[0]?.country?.currency}{" "}
                            {x?.products?.price?.[0]?.actual_price}
                          </del>
                        ) : (
                          ""
                        )}
                      </p>
                      {x?.products?.total_review && (
                        <p className="rating">
                          <Rate
                            disabled
                            allowHalf
                            defaultValue={x?.products?.total_review}
                            className="rat_icon"
                          />
                        </p>
                      )}
                    </div>
                    <Button
                      className="add_cart_btn"
                      onClick={() => addToCart(x, x?.products?.price?.[0])}
                    >
                      <AiOutlineShopping className="cart_icon" />
                    </Button>
                  </div>
                  <div className="hover_product_wrape">
                    <div className="whishlist_wrape">
                      <Button className="eye_icon_wrape">
                        <AiOutlineHeart className="eye_icon" />
                      </Button>
                      <Button
                        className="eye_icon_wrape"
                        onClick={() => {
                          setModalShow(true);
                          setProductID(x?.products?.id);
                          setCountry(x?.products?.price?.[0]?.country?.name);
                        }}
                      >
                        <AiOutlineEye className="eye_icon" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Slider>

        {productID && modalShow && (
          <ProductQuickView
            show={modalShow}
            onHide={() => setModalShow(false)}
            productId={productID}
            countryName={country}
          />
        )}
      </div>
    </Container>
  );
};

export default RelatedProducts;
