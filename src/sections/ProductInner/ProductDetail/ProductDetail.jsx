import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";
import { Rate } from "antd";
import { BiMinus } from "react-icons/bi";
import { FaHeart, FaShoppingBasket } from "react-icons/fa";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import ProductSlider from "../ProductSlider";
import useCart from "../../../hooks/useCart";
import useWishlist from "../../../hooks/useWishlist";
import "./ProductDetail.scss";

const ProductDetail = ({ productData, scrollRef }) => {
  const [quantity, setQuantity] = useState([{ id: "", qty: 1 }]);
  useEffect(() => {
    let quantityDAta = productData?.price?.map((item) => {
      return { id: "", qty: 1 };
    });
    setQuantity(quantityDAta);
  }, []);

  const stockStatus = productData?.stock === "0" ? "Out of Stock" : "In Stock";

  const { addToCart } = useCart();
  const { addtoWishList } = useWishlist();

  const handleInputOnChangeMulti = (id, value, index = -1) => {
    let updatedValue = [...quantity];
    if (index > -1) {
      if (value == "decrease") {
        updatedValue[index].id = id;
        updatedValue[index].qty = updatedValue[index].qty - 1;
      } else if (value == "add") {
        updatedValue[index].id = id;
        updatedValue[index].qty = updatedValue[index].qty + 1;
      }
    } else {
      updatedValue.id = id;
      updatedValue.qty = value;
    }
    setQuantity(updatedValue);
  };

  const scrollToRef = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });
  };
  return (
    <Container>
      <div className="product-detail-wrape mb-60">
        <Row>
          <Col sm={12} lg={5}>
            <ProductSlider sliderImages={productData?.slider_img} />
          </Col>
          <Col sm>
            <div
              className="detail-wrape"
              data-aos="fade-up"
              data-aos-once="true"
            >
              {productData?.price?.[0]?.sale_price != 0 ||
              productData?.price?.[0]?.deal_price != 0 ? (
                <span className="discount">
                  {Math.round(
                    ((parseFloat(productData?.price?.[0]?.actual_price) -
                      (parseFloat(productData?.price?.[0]?.deal_price) ||
                        parseFloat(productData?.price?.[0]?.sale_price))) /
                      parseFloat(productData?.price?.[0]?.actual_price)) *
                      100
                  )}
                  % off
                </span>
              ) : null}
              <h3>{productData?.name}</h3>
              <p className="price">
                {productData?.price?.[0]?.country?.currency}{" "}
                {productData?.price?.[0]?.sale_price != 0
                  ? productData?.price?.[0]?.sale_price
                  : productData?.price?.[0]?.deal_price != 0
                  ? productData?.price?.[0]?.deal_price
                  : productData?.price?.[0]?.actual_price}{" "}
                {productData?.price?.[0]?.deal_price != 0 ||
                productData?.price?.[0]?.sale_price != 0 ? (
                  <del>
                    {productData?.price?.[0]?.country?.currency}{" "}
                    {productData?.price?.[0]?.actual_price}
                  </del>
                ) : (
                  ""
                )}
              </p>
              {productData?.review_count !== 0 && (
                <p className="rating">
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={productData?.total_review}
                    className="rat_icon"
                  />{" "}
                  ({productData?.review_count} customer reviews)
                </p>
              )}

              <p
                className="detail"
                dangerouslySetInnerHTML={{
                  __html:
                    productData?.short_description?.substr(0, 500) + "...",
                }}
              />
              <button
                className="read_more"
                onClick={() => scrollToRef(scrollRef)}
              >
                read more
              </button>
              <ul className="list_style">
                <li>
                  <span>SKU:</span> {productData?.sku}
                </li>
                <li>
                  <span>Availability:</span>{" "}
                  <span
                    className={
                      productData?.stock === "0" ? "out_stock" : "in_stock"
                    }
                  >
                    {stockStatus}
                  </span>
                </li>
                {productData?.shipping_charges && (
                  <li className="Shipping_ckt">
                    <span>Standard Shipping Charges:</span>{" "}
                    {productData?.price?.[0]?.country?.currency}{" "}
                    {productData?.shipping_charges}
                  </li>
                )}
                {productData?.express_charges && (
                  <li className="Shipping_ckt">
                    <span>Express Shipping Charges:</span>{" "}
                    {productData?.price?.[0]?.country?.currency}{" "}
                    {productData?.express_charges}
                  </li>
                )}

                <li>
                  <span>Categories:</span>{" "}
                  {productData?.category?.map((t, index) => (
                    <span key={index} className="subCat">
                      {t?.name}
                      {index === productData?.category?.length - 1 ? "" : ", "}
                    </span>
                  ))}
                </li>
                <li>
                  <span>Share:</span>{" "}
                  <FacebookShareButton
                    url={`https://medi-express.prismcloudhosting.com/product/${productData?.route}`}
                    quote={productData?.name}
                    hashtag="#MEDIEXPRESS"
                  >
                    <FacebookIcon size={20} round={true} />
                  </FacebookShareButton>{" "}
                  <TwitterShareButton
                    url={`https://medi-express.prismcloudhosting.com/product/${productData?.route}`}
                    title={productData?.name}
                    hashtags={["MEDIEXPRESS", "Product"]}
                  >
                    <TwitterIcon size={20} round={true} />
                  </TwitterShareButton>{" "}
                  <LinkedinShareButton
                    url={`https://medi-express.prismcloudhosting.com/product/${productData?.route}`}
                    title={productData?.name}
                    summary={productData?.short_description}
                  >
                    <LinkedinIcon size={20} round={true} />
                  </LinkedinShareButton>{" "}
                  <WhatsappShareButton
                    url={`https://medi-express.prismcloudhosting.com/product/${productData?.route}`}
                    title={productData?.name}
                  >
                    <WhatsappIcon size={20} round={true} />
                  </WhatsappShareButton>
                </li>
              </ul>
            </div>
            <div
              className="variations-wrape"
              data-aos="fade-up"
              data-aos-once="true"
            >
              <Table responsive>
                <thead>
                  <tr>
                    <th>Pack</th>
                    <th>Quantity</th>
                    <th>Price/Unit</th>
                    <th>Price</th>
                    <th>Cart</th>
                    <th>Wishlist</th>
                  </tr>
                </thead>
                <tbody>
                  {productData?.price?.map((x, index) => (
                    <tr key={index}>
                      <td className="text-start">Pack Of {x?.pack_of}</td>
                      <td>
                        <div className="quantity-wrape">
                          <Button className="inc-btn">
                            <BiMinus
                              fontSize="18px"
                              onClick={() => {
                                if (quantity[index].qty > 1) {
                                  handleInputOnChangeMulti(
                                    x?.id,
                                    "decrease",
                                    index
                                  );
                                }
                              }}
                            />
                          </Button>
                          <span className="quantity">
                            {quantity[index]?.qty}
                          </span>
                          <Button className="dec-btn">
                            <BsPlus
                              fontSize="18px"
                              onClick={() => {
                                if (quantity[index].qty <= 9) {
                                  handleInputOnChangeMulti(x?.id, "add", index);
                                }
                              }}
                            />
                          </Button>
                        </div>
                      </td>
                      <td>
                        {/* {x?.country?.currency} {x?.actual_price} */}
                        {x?.country?.currency}{" "}
                        {x?.sale_price != 0
                          ? x?.sale_price
                          : x?.deal_price != 0
                          ? x?.deal_price
                          : x?.actual_price}{" "}
                      </td>
                      <td>
                        <p className="discount">
                          {x?.deal_price != 0 || x?.sale_price != 0 ? (
                            <>
                              {Math.round(
                                ((parseFloat(x?.actual_price) -
                                  (parseFloat(x?.deal_price) ||
                                    parseFloat(x?.sale_price))) /
                                  parseFloat(x?.actual_price)) *
                                  100
                              )}
                              %
                            </>
                          ) : null}
                          {x?.deal_price != 0 || x?.sale_price != 0 ? (
                            <del>
                              {x?.country?.currency} {x?.actual_price}
                            </del>
                          ) : (
                            <>
                              {x?.country?.currency} {x?.actual_price}
                            </>
                          )}
                        </p>
                      </td>
                      <td>
                        <Button
                          className="cart_btn"
                          onClick={() => {
                            addToCart(productData, x, quantity[index]?.qty);
                          }}
                        >
                          <FaShoppingBasket fontSize={"16px"} />
                        </Button>
                      </td>
                      <td>
                        <Button
                          className="cart_btn"
                          onClick={() => addtoWishList(productData, x)}
                        >
                          <FaHeart fontSize={"16px"} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ProductDetail;
