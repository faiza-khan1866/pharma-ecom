import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { Container } from "react-bootstrap";
import "./Layout/Layout.scss";

const OrderTracking = () => {
  const { id } = useParams();
  const [trackingprocess, setTrackingprocess] = useState();

  return (
    <Container>
      <div className="order_tracking_wrape mb-60">
        <h4 className="title">
          Tracking Order No - <span>OR327571313919514100</span>
        </h4>
        <div className="order_tracking">
          {trackingprocess === "ORDERPLACED" && (
            <div className="order_placed_note">
              <p>Order Placed, Your Order will be updated Soon!</p>
            </div>
          )}
          {trackingprocess === "ORDERCANCELLED" && (
            <div className="order_placed_note">
              <p className="text-danger">No Record Found Please Try Again!</p>
            </div>
          )}
          <div className="steps">
            <div
              className={`step ${
                trackingprocess === "ORDERCONFIRMED"
                  ? "completed"
                  : trackingprocess === "ORDERDISPATCHED"
                  ? "completed"
                  : trackingprocess === "ORDERDELIVERED"
                  ? "completed"
                  : ""
              }`}
            >
              <div className="step-icon-wrap">
                <div className="step-icon">
                  <MdOutlineShoppingCart fontSize="30px" />
                </div>
              </div>
              <h4 className="step-title">Order Confirmed</h4>
            </div>
            <div
              className={`step ${
                trackingprocess === "ORDERDISPATCHED"
                  ? "completed"
                  : trackingprocess === "ORDERDELIVERED"
                  ? "completed"
                  : ""
              }`}
            >
              <div className="step-icon-wrap">
                <div className="step-icon">
                  <TbTruckDelivery fontSize="30px" />
                </div>
              </div>
              <h4 className="step-title">Product Dispatched</h4>
            </div>
            <div
              className={`step ${
                trackingprocess === "ORDERDELIVERED" ? "completed" : ""
              }`}
            >
              <div className="step-icon-wrap">
                <div className="step-icon">
                  <AiOutlineHome fontSize="30px" />
                </div>
              </div>
              <h4 className="step-title">Product Delivered</h4>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OrderTracking;
