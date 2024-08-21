import React, { useContext, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import Coupon from "../../../components/Coupon/Coupon";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import CheckoutDetails from "../CheckoutDetails/CheckoutDetails";
import AddressList from "../AddressList/index";
import useCart from "../../../hooks/useCart";
import { useSelector, useDispatch } from "react-redux";
import { makeOrder } from "../../../http/apiService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GeneralContext } from "../../../context/GeneralContext";
import { logOutUser } from "../../../features/user/userSlice";
import "./CheckoutMain.scss";

function CheckoutMain() {
  const { getCart, TotalItemsSum, clearCart } = useCart();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //
  const { countryData } = useContext(GeneralContext);
  const userData = useSelector((state) => state.user.userData);
  let shippingType = useSelector((state) => state.shipping);
  let countryID = useSelector((state) => state.shipping?.shippingOptions?.id);
  let auth_token = useSelector((state) => state.user.auth_token);
  const currency = countryData?.currency?.code;
  const CartData = getCart();
  const subTotal = useMemo(() => TotalItemsSum(), [CartData]);
  const [isLoading, setIsLoading] = useState(false);
  const [AddAddress, setAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderNotes, setOrderNotes] = useState(null);
  const [editAddressId, setEditAddressId] = useState(null);

  const sendOrderDetails = async (billingDetails) => {
    // setIsLoading(true);
    console.log("selectedAddress", selectedAddress);
    console.log("orderNotes", orderNotes);
    return;
    let header = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };
    let products = await CartData?.map((item) => {
      return {
        product_id: item?.id,
        product_price_variation: item?.price?.id,
        qty: item?.quantity,
      };
    });
    if (!userData.id) {
      toast.info("PLease Login Again").then((result) => {
        console.log("🚀 ~ sendOrderDetails ~ result:", result);

        dispatch(logOutUser());
        navigate(`/login`);
      });

      return;
    }
    let poyload = {
      user_id: userData.id,
      product: products,
      billing_address: {
        full_name: billingDetails?.firstName + " " + billingDetails?.lastName,
        email: billingDetails?.email,
        mobile: billingDetails?.Phone,
        country: billingDetails?.country,
        city: billingDetails?.Town_City,
        state: billingDetails?.State,
        postal_code: billingDetails?.postal_code,
        address_line1: billingDetails?.streetAddress,
        address_line2: "",
        address_type: "",
      },
      sub_total: parseFloat(subTotal).toFixed(2),
      payment_type: "paypal",
      discounted_amount: "",
      country_id: countryID,
      currency: currency,
      shipping_charges: shippingType?.shipping?.price,
      total_amount: parseFloat(
        subTotal + parseFloat(shippingType?.shipping?.price)
      ).toFixed(2),
    };
  };
  return (
    <div className="checkout_wraper mb-60">
      <Container>
        <h2 className="title_main" data-aos="fade-down" data-aos-once="true">
          Checkout
        </h2>
        {/* <Coupon /> */}
        <Row>
          <Col lg="7">
            {!AddAddress ? (
              <AddressList
                setAddress={setAddress}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
                setEditAddressId={setEditAddressId}
              />
            ) : (
              <CheckoutForm
                setAddress={setAddress}
                editAddressId={editAddressId}
                setEditAddressId={setEditAddressId}
              />
            )}
            {AddAddress ? null : (
              <Row>
                <Col lg="12">
                  <div className="mb-1 form_field_Wrapper">
                    <label className="form-label">Order Notes</label>
                    <textarea
                      className="form-control"
                      id="orderNotes"
                      name="orderNotes"
                      rows="6"
                      onChange={(e) => setOrderNotes(e.target.value)}
                    ></textarea>
                  </div>
                </Col>
              </Row>
            )}
          </Col>
          <Col lg="5">
            <CheckoutDetails
              isLoading={isLoading}
              AddAddress={AddAddress}
              setAddress={setAddress}
              sendOrderDetails={sendOrderDetails}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CheckoutMain;
