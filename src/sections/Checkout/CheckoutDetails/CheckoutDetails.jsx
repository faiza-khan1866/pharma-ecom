import React, { useContext, useEffect, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import product1 from "../../../assets/images/products/product3.png";
import { GeneralContext } from "../../../context/GeneralContext";
import useCart from "../../../hooks/useCart";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryDetails } from "../../../http/apiService";
import {
  setShipping,
  setShippingOptions,
} from "../../../features/shipping/shippingSlice";
import "./CheckoutDetails.scss";

function CheckoutDetails(props) {
  const dispatch = useDispatch();
  const { countryData } = useContext(GeneralContext);
  const country = countryData?.country_name;
  let cartItemsEncrypted = useSelector((state) => state.cart.items);
  const { getCart, TotalItemsSum } = useCart();
  const totalCalculation = useMemo(() => TotalItemsSum(), [cartItemsEncrypted]);

  const CartData = getCart();
  let shippingType = useSelector((state) => state.shipping);
  let auth_token = useSelector((state) => state.user.auth_token);
  let header = {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  };

  // get shipping charges
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
    <section id="CheckoutDetails" data-aos="zoom-in" data-aos-once="true">
      <Container>
        <div className="Billing_wrapper">
          <Row>
            <Col lg="12">
              <div className="Title_main borderBottom mb-3">
                <h5>Your Order</h5>
              </div>
            </Col>
            <Col lg="12">
              <div className="productDetails borderBottom mb-3 pr_22">
                <Row>
                  <Col>
                    <div className="product_title_wrapper">
                      <h5 className="Product_title">Product</h5>
                    </div>
                  </Col>
                  <Col>
                    <div className="product_title_wrapper middleTitle">
                      <h5 className="Product_title">Quantity</h5>
                    </div>
                  </Col>
                  <Col>
                    <div className="product_title_wrapper last_title">
                      <h5 className="Product_title">Total</h5>
                    </div>
                  </Col>
                </Row>
                {/* cart items  */}
                {CartData?.map((item, i) => (
                  <Row className="mt-2" key={i}>
                    <Col>
                      <img
                        src={
                          item?.featured_img
                            ? process.env.REACT_APP_IMAGE_BASE_URL +
                              item?.featured_img
                            : product1
                        }
                        alt="thumbnail"
                        width="80px"
                        className="rounded mb-2"
                      />
                      <br />
                      <span>
                        {item?.name} <br />
                        Pack of {item?.price?.pack_of}
                      </span>
                    </Col>
                    <Col>
                      <div className="productQuantity middleTitle">
                        <h5>X{item?.quantity}</h5>
                      </div>
                    </Col>
                    <Col>
                      <div className="productPrice last_title">
                        <h5 className="Product_Amount">
                          {item?.price?.country?.currency}{" "}
                          {(
                            parseFloat(item?.currentPrice) *
                            parseInt(item?.quantity)
                          ).toFixed(2)}
                        </h5>
                      </div>
                    </Col>
                  </Row>
                ))}
                {/* cart item end  */}
              </div>
            </Col>
            <Col lg="12">
              <div className="billingSubTotal borderBottom mb-3 pr_22">
                <h5 className="Product_title">SubTotal:</h5>
                <h5 className="Product_Amount">
                  {CartData?.[0]?.price?.country?.currency}{" "}
                  {parseFloat(totalCalculation).toFixed(2)}
                </h5>
              </div>
            </Col>
            <Col lg="12">
              <div className="BillingShipping borderBottom mb-3 pr_22">
                <h5 className="Product_title">Shipping Charge:</h5>
                <div>
                  <div className="ShipingWrapper">
                    <input
                      type="radio"
                      name="shipping"
                      className="form-check-input"
                      value={
                        shippingType?.shippingOptions?.standard_shipping_charges
                      }
                      checked={
                        shippingType?.shipping?.type == "Standard"
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
                      <div className="shipping_title">
                        Standard:{" "}
                        {
                          shippingType?.shippingOptions
                            ?.standard_shipping_charges
                        }{" "}
                        {CartData?.[0]?.price?.country?.currency}
                      </div>
                    </label>
                  </div>
                  <div className="ShipingWrapper">
                    <input
                      type="radio"
                      name="shipping"
                      className="form-check-input"
                      value={
                        shippingType?.shippingOptions?.express_shipping_charges
                      }
                      checked={
                        shippingType?.shipping?.type == "Standard"
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
                    <div className="shipping_title">
                      Express:{" "}
                      {shippingType?.shippingOptions?.express_shipping_charges}{" "}
                      {CartData?.[0]?.price?.country?.currency}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg="12">
              <div className="BillingTotal borderBottom mb-3 pr_22">
                <h5 className="Product_title">Total:</h5>
                <h5 className="Product_Amount">
                  {CartData?.[0]?.price?.country?.currency}{" "}
                  {parseFloat(
                    totalCalculation + parseFloat(shippingType?.shipping?.price)
                  ).toFixed(2)}
                </h5>
              </div>
            </Col>
            <Col lg="12">
              <div className="PrivacyPolicy">
                <p>
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our privacy policy.
                </p>
              </div>
            </Col>
            <Col lg="12">
              {props?.isLoading ? (
                <div className="d-flex justify-content-center align-items-center">
                  <PropagateLoader color="#036c5f" />
                </div>
              ) : (
                <button
                  className="billSubmitButton"
                  type="submit"
                  onClick={props?.sendOrderDetails}
                  disabled={props?.AddAddress}
                >
                  Place Order
                </button>
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
}

export default CheckoutDetails;
