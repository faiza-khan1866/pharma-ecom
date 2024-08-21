import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { Rate } from "antd";
import { TfiAngleDoubleRight, TfiAngleDoubleLeft } from "react-icons/tfi";
import {
  AiOutlineShopping,
  AiOutlineHeart,
  AiOutlineEye,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import product from "./../../../assets/images/products/product2.png";
import ProductQuickView from "../ProductQuickView/ProductQuickView";
import DataLoader from "../../../components/Loader/DataLoader";
import useCart from "../../../hooks/useCart";
import useWishlist from "../../../hooks/useWishlist";
import "./PromotionsCard.scss";

const PromotionsCard = ({
  items,
  loading,
  selectedFilter,
  handleFilterChange,
}) => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = React.useState(false);
  const [productID, setProductID] = React.useState(null);
  const [country, setCountry] = React.useState("");
  // useCart
  const { addToCart } = useCart();
  const { addtoWishList } = useWishlist();
  // pagination code start

  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 12;
  const pagesVisited = pageNumber * usersPerPage;

  const displayItems =
    items &&
    items?.slice(pagesVisited, pagesVisited + usersPerPage)?.map((x, i) => {
      return (
        <Col sm={12} md={6} lg={3} key={i}>
          <div className="product-item" data-aos="zoom-in" data-aos-once="true">
            <div
              className="image-box"
              onClick={() => navigate(`/product/${x?.route}`)}
            >
              <figure>
                <img
                  src={
                    x?.featured_img
                      ? process.env.REACT_APP_IMAGE_BASE_URL + x?.featured_img
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
            <h3 onClick={() => navigate(`/product/${x?.route}`)}>{x?.name}</h3>
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
                      allowHalf
                      disabled
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
                <Button
                  className="eye_icon_wrape"
                  onClick={() => {
                    setModalShow(true);
                    setProductID(x?.id);
                    setCountry(x?.price?.[0]?.country?.name);
                  }}
                >
                  <AiOutlineEye className="eye_icon" />
                </Button>
              </div>
            </div>
          </div>
        </Col>
      );
    });

  const pageCount = Math.ceil(items?.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // pagination code end
  return (
    <Container>
      <div className="product-wrape mb-60">
        <h2 className="main-title" data-aos="fade-down" data-aos-once="true">
          Products <span className="show-result">({items?.length})</span>
        </h2>
        <Row>
          <Col sm>
            <div
              className="product_intro"
              data-aos="fade-down"
              data-aos-once="true"
            >
              <p>Promotion Products</p>
              <Form.Group className="form_sort_wrape">
                <Form.Label>Sortby</Form.Label>
                <Form.Select
                  onChange={handleFilterChange}
                  value={selectedFilter}
                >
                  <option value="All">All</option>
                  <option value="Latest">Latest</option>
                  <option value="Average Rating">Average Rating</option>
                  <option value="Price: High - Low">Price: High - Low</option>
                  <option value="Price: Low - High">Price: Low - High</option>
                </Form.Select>
              </Form.Group>
            </div>
            {loading ? (
              <DataLoader />
            ) : (
              <>
                {items?.length === 0 ? (
                  <p
                    className="text-center text-secondary mt-5"
                    style={{ fontSize: "18px" }}
                  >
                    No Product Found !!!
                  </p>
                ) : (
                  <>
                    <Row>{displayItems}</Row>
                    {productID && modalShow && (
                      <ProductQuickView
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        productId={productID}
                        countryName={country}
                      />
                    )}
                    <div
                      className="pagination-wrap"
                      data-aos="fade-up"
                      data-aos-once="true"
                    >
                      <ReactPaginate
                        previousLabel={<TfiAngleDoubleLeft fontSize="16px" />}
                        nextLabel={<TfiAngleDoubleRight fontSize="16px" />}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default PromotionsCard;
