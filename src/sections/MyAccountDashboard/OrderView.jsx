import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { fetchUserOrderDetails } from "../../http/apiService";
import moment from "moment";
import "./Layout/Layout.scss";

const OrderView = () => {
  const { id } = useParams();
  let auth_token = useSelector((state) => state.user.auth_token);
  const [singleOrderDetails, setSingleOrderDetails] = useState({});
  const [isloading, setIsloading] = useState(false);

  const getUserOrderDetails = async () => {
    try {
      let header = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      };
      setIsloading(true); // Show the loader
      const response = await fetchUserOrderDetails(id, header);
      if (response?.data?.[0] === 404) {
        setSingleOrderDetails({});
      } else {
        setSingleOrderDetails(response?.data);
      }
    } catch (error) {
      console.error("Error fetching Data:", error);
    } finally {
      setIsloading(false); // Hide the loader
    }
  };

  useEffect(() => {
    getUserOrderDetails();
  }, [id]);

  return (
    <Container>
      <div className="view_order_wrape mb-60">
        <h4 className="title">Order Details</h4>
        {isloading ? (
          <p>Loading...</p>
        ) : (
          <div className="view_order">
            {/* <h5>Delivery Address</h5> */}
            <div className="order_detail_item">
              <p>Order Number:</p>
              <span>{singleOrderDetails?.order_number}</span>
            </div>
            <div className="order_detail_item">
              <p> Shipped Date:</p>
              <span>
                {moment(singleOrderDetails?.updated_at).format("DD/MM/YYYY")}
              </span>
            </div>
            <div className="order_detail_item">
              <p>Total Amount:</p>
              <span>
                {singleOrderDetails?.currency}{" "}
                {singleOrderDetails?.total_amount}
              </span>
            </div>
            <div className="order_detail_item">
              <p>Order Status:</p>
              {singleOrderDetails?.status === "ORDERPLACED" ? (
                <span className="text-info">Order Placed</span>
              ) : singleOrderDetails?.status === "ORDERDISPATCHED" ? (
                <span className="text-info">Order Dispatched</span>
              ) : singleOrderDetails?.status === "ORDERDELIVERED" ? (
                <span className="text-success">Order Delivered</span>
              ) : (
                <span className="text-danger">Order Canceled</span>
              )}
            </div>
            {singleOrderDetails?.tracking_number && (
              <div className="order_detail_item">
                <p>Tracking No:</p>
                <span>{singleOrderDetails?.tracking_number}</span>
              </div>
            )}
            {singleOrderDetails?.logistics_partner_name && (
              <div className="order_detail_item">
                <p>Logistic Partner:</p>
                <span>{singleOrderDetails?.logistics_partner_name}</span>
              </div>
            )}
            {singleOrderDetails?.logistics_partner_link && (
              <div className="order_detail_item">
                <p>Logistic Partner Link:</p>
                <span>{singleOrderDetails?.logistics_partner_link}</span>
              </div>
            )}
            <hr />
            <h5>User Details</h5>
            <div className="order_detail_item">
              <p>User Name:</p>
              <span>
                {singleOrderDetails?.user?.first_name}{" "}
                {singleOrderDetails?.user?.last_name}
              </span>
            </div>
            <div className="order_detail_item">
              <p>User Email:</p>
              <span>{singleOrderDetails?.user?.email}</span>
            </div>
            {singleOrderDetails?.billing_address && (
              <>
                <hr />
                <h5>Delivery Address</h5>
                <div className="order_detail_item">
                  <p>Full Name:</p>
                  <span>{singleOrderDetails?.billing_address?.full_name}</span>
                </div>
                <div className="order_detail_item">
                  <p>Email:</p>
                  <span>{singleOrderDetails?.billing_address?.email}</span>
                </div>
                <div className="order_detail_item">
                  <p>Mobile:</p>
                  <span>{singleOrderDetails?.billing_address?.mobile}</span>
                </div>
                <div className="order_detail_item">
                  <p>Address:</p>
                  <span>
                    {singleOrderDetails?.billing_address?.address_line1}{" "}
                    {singleOrderDetails?.billing_address?.address_line2}{" "}
                    {singleOrderDetails?.billing_address?.city},{" "}
                    {singleOrderDetails?.billing_address?.country},{" "}
                    {singleOrderDetails?.billing_address?.state}{" "}
                    {singleOrderDetails?.billing_address?.postal_code}
                  </span>
                </div>
              </>
            )}
            {singleOrderDetails?.order_details?.length > 0 && (
              <>
                <hr />
                <h5>Products</h5>
                <div className="row gy-3 gy-lg-0">
                  {singleOrderDetails?.order_details?.map((order) =>
                    order?.products?.map((product) => (
                      <div
                        className="col-6 col-md-4 col-lg-3"
                        key={product?.id}
                      >
                        <div className="product_item">
                          <figure>
                            <img
                              src={
                                process.env.REACT_APP_IMAGE_BASE_URL +
                                product?.featured_img
                              }
                              alt="product image"
                            />
                          </figure>
                          <p>
                            {product?.name} x {order?.qty}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default OrderView;
