import React, { useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import ProductImg from "../../../assets/images/products/product3.png";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";
import useCart from "../../../hooks/useCart";
import { useDispatch, useSelector } from "react-redux";
import CartEmpty from "../CartEmpty/CartEmpty";
import { GeneralContext } from "../../../context/GeneralContext";
import { fetchCountryDetails } from "../../../http/apiService";
import {
  setShipping,
  setShippingOptions,
} from "../../../features/shipping/shippingSlice";
import "./CartMain.scss";

function CartMain() {
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const { countryData } = useContext(GeneralContext);
  const country = countryData?.country_name;
  const [totalCount, setTotalCount] = useState(1);
  const { removeCart, updateCart, clearCart, TotalItemsSum, getCart } =
    useCart();

  // use Selectors
  let shippingType = useSelector((state) => state.shipping);
  let cartItemsEncrypted = useSelector((state) => state.cart.items);
  let cartItems = useMemo(() => getCart(), [cartItemsEncrypted]);
  let auth_token = useSelector((state) => state.user.auth_token);
  let header = {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  };
  const totalCalculation = useMemo(() => TotalItemsSum(), [cartItemsEncrypted]);
  async function GetShippingCharges() {
    if (!country) {
      return;
    }
    if (shippingType?.shipping?.type) {
      return;
    }
    try {
      const response = await fetchCountryDetails(country, header);
      dispatch(setShippingOptions({ ...response?.data }));
      dispatch(
        setShipping({
          type: "Standard",
          price: response?.data.standard_shipping_charges,
        })
      );
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    GetShippingCharges();
  }, [country]);
  return (
    <>
      {cartItems?.length > 0 ? (
        <section id="CartMain">
          <div className="container">
            <h2
              className="main_title"
              data-aos="fade-down"
              data-aos-once="true"
            >
              Shopping cart
            </h2>
            <Row>
              <Col lg="8">
                <div
                  className="Cart_width"
                  data-aos="zoom-in"
                  data-aos-once="true"
                >
                  <div className="Cart_wrapper">
                    <div className="cart-list-heading">
                      <Row className="mt-3">
                        <Col xs="4" sm="6" lg="6">
                          <h5 className="product-title">Product</h5>
                        </Col>
                        <Col xs="4" sm="2" lg="2">
                          <h5>Price</h5>
                        </Col>
                        <Col xs="4" sm="4" lg="4">
                          <h5 className="total-Amount-title">Total</h5>
                        </Col>
                      </Row>
                    </div>
                    <div className="cart-list-Items borderAndSpacing">
                      {cartItems?.map((item, index) => (
                        <Row key={index}>
                          {/* product  */}
                          <Col xs="4" sm="6" lg="6">
                            <div className="Product">
                              <MdOutlineClose
                                onClick={() => removeCart(item?.price.id)}
                                style={{ cursor: "pointer" }}
                              />
                              <div className="product-item">
                                <div className="product-image">
                                  <img
                                    src={
                                      item?.featured_img
                                        ? process.env.REACT_APP_IMAGE_BASE_URL +
                                          item?.featured_img
                                        : ProductImg
                                    }
                                    alt="thumbnail"
                                  />
                                </div>
                                <div className="product-details">
                                  <h5
                                    onClick={() =>
                                      naviagte(`/product/${item?.route}`)
                                    }
                                  >
                                    {item?.name} <br /> Pack of{" "}
                                    {item?.price?.pack_of}
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </Col>
                          {/* price */}
                          <Col xs="4" sm="2" lg="2">
                            <div className="Price">
                              <h5>
                                <p className="discount">
                                  {item?.price?.deal_price != 0 ||
                                  item?.price?.sale_price != 0 ? (
                                    <>
                                      {Math.round(
                                        ((parseFloat(
                                          item?.price?.actual_price
                                        ) -
                                          (parseFloat(
                                            item?.price?.deal_price
                                          ) ||
                                            parseFloat(
                                              item?.price?.sale_price
                                            ))) /
                                          parseFloat(
                                            item?.price?.actual_price
                                          )) *
                                          100
                                      )}
                                      %
                                    </>
                                  ) : null}
                                  {item?.price?.deal_price != 0 ||
                                  item?.price?.sale_price != 0 ? (
                                    <del>
                                      {item?.price?.country?.currency}{" "}
                                      {item?.price?.actual_price}
                                    </del>
                                  ) : (
                                    <>
                                      {item?.price?.country?.currency}{" "}
                                      {item?.price?.actual_price}
                                    </>
                                  )}
                                </p>
                              </h5>
                            </div>
                          </Col>
                          {/* total */}
                          <Col xs="4" sm="4" lg="4">
                            <div className="Total">
                              <div className="total-Item">
                                <FaMinus
                                  style={{
                                    fontSize: "12px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    if (item?.quantity > 1) {
                                      updateCart(
                                        item.id,
                                        item?.price.id,
                                        item?.quantity - 1
                                      );
                                    }
                                  }}
                                />
                                <input
                                  value={item?.quantity}
                                  type="number"
                                  onChange={(e) =>
                                    updateCart(
                                      item.id,
                                      item?.price.id,
                                      e.target.value
                                    )
                                  }
                                ></input>
                                {/* <span>{totalCount}</span> */}
                                <FaPlus
                                  style={{
                                    fontSize: "12px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    if (item?.quantity <= 9) {
                                      updateCart(
                                        item.id,
                                        item?.price.id,
                                        item?.quantity + 1
                                      );
                                    }
                                  }}
                                />
                              </div>
                              <div className="total-Amount">
                                <h5>
                                  {item?.price?.country?.currency}{" "}
                                  {(
                                    parseFloat(item?.currentPrice) *
                                    parseInt(item?.quantity)
                                  ).toFixed(2)}
                                </h5>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      ))}
                    </div>
                    <div className="clear_cart_wrape mt-4">
                      <Button
                        className="backtoClearCart"
                        onClick={() => clearCart()}
                      >
                        Clear Cart <MdOutlineClose />
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg="4">
                <div
                  className="Cart_total_Wrapper"
                  data-aos="zoom-in"
                  data-aos-once="true"
                >
                  <Row className="mt-3">
                    <div className="Cart_total_title">
                      <Col>
                        <h5 className="cart-total-bill-heading">Cart Total</h5>
                      </Col>
                    </div>
                    <div className="cart-total-items borderAndSpacing">
                      <Row>
                        <Col>
                          <div className="totalbillDetails">
                            <div className="container-fluid">
                              <div className="subTotal border_bottom mt-3">
                                <h5>Subtotal</h5>
                                <h5 className="amount">
                                  {cartItems?.[0]?.price?.country?.currency}{" "}
                                  {totalCalculation.toFixed(2)}
                                </h5>
                              </div>
                              <div className="shipping border_bottom mt-3">
                                <h5>Shipping</h5>
                                <div className="shipping_details mb-1">
                                  <div className="ShipingWrapper">
                                    <input
                                      type="radio"
                                      name="shipping"
                                      className="form-check-input"
                                      value={
                                        shippingType?.shippingOptions
                                          ?.standard_shipping_charges
                                      }
                                      checked={
                                        shippingType?.shipping?.type ==
                                        "Standard"
                                          ? true
                                          : false
                                      }
                                      onChange={() => {
                                        dispatch(
                                          setShipping({
                                            type: "Standard",
                                            price:
                                              shippingType?.shippingOptions
                                                ?.standard_shipping_charges,
                                          })
                                        );
                                      }}
                                    />
                                    <label htmlFor="">
                                      <h5 className="amount">
                                        Standard:{" "}
                                        {
                                          shippingType?.shippingOptions
                                            ?.standard_shipping_charges
                                        }{" "}
                                        {
                                          cartItems?.[0]?.price?.country
                                            ?.currency
                                        }
                                      </h5>
                                    </label>
                                  </div>
                                  <div className="ShipingWrapper">
                                    <input
                                      type="radio"
                                      name="shipping"
                                      className="form-check-input"
                                      value={
                                        shippingType?.shippingOptions
                                          ?.express_shipping_charges
                                      }
                                      checked={
                                        shippingType?.shipping?.type ==
                                        "Standard"
                                          ? false
                                          : true
                                      }
                                      onChange={() => {
                                        dispatch(
                                          setShipping({
                                            type: "Express",
                                            price:
                                              shippingType?.shippingOptions
                                                ?.express_shipping_charges,
                                          })
                                        );
                                      }}
                                    />
                                    <h5 className="amount">
                                      Express:{" "}
                                      {
                                        shippingType?.shippingOptions
                                          ?.express_shipping_charges
                                      }{" "}
                                      {cartItems?.[0]?.price?.country?.currency}
                                    </h5>
                                  </div>
                                  <span className="address">
                                    Shipping to UAE{" "}
                                  </span>
                                  <span className="ChangeAddress">
                                    Change Address
                                  </span>
                                </div>
                              </div>
                              <div className="Total mt-3">
                                <h5>Total</h5>
                                <h5 className="amount">
                                  {cartItems?.[0]?.price?.country?.currency}{" "}
                                  {parseFloat(
                                    totalCalculation +
                                      parseFloat(shippingType?.shipping?.price)
                                  ).toFixed(2)}
                                </h5>
                              </div>
                              <Button
                                className="checkout_btn"
                                onClick={() => naviagte(`/checkout`)}
                              >
                                Proceed to Checkout
                              </Button>
                              <Button
                                className="shop_btn"
                                onClick={() => naviagte(`/shop`)}
                              >
                                Continue Shopping
                              </Button>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </section>
      ) : (
        <CartEmpty />
      )}
    </>
  );
}

export default CartMain;
