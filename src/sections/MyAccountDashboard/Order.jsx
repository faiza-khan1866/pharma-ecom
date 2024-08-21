import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
// import { GeneralContext } from "../../context/GeneralContext";
import { fetchUserOrders } from "../../http/apiService";
import { useSelector } from "react-redux";
import moment from "moment";

const Order = () => {
  const navigate = useNavigate();
  let auth_token = useSelector((state) => state.user.auth_token);
  const userId = useSelector((state) => state.user.userData?.id);
  // const { countryData } = useContext(GeneralContext);
  // const currency = countryData?.currency?.code;
  const [orderList, setOrderList] = useState([]);
  const [isloading, setIsloading] = useState(false);

  const getUserOrders = async () => {
    try {
      let header = {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      };
      setIsloading(true); // Show the loader
      const response = await fetchUserOrders(42, header);
      if (response?.data?.[0] === 404) {
        setOrderList([]);
      } else {
        setOrderList(response?.data);
      }
    } catch (error) {
      console.error("Error fetching Data:", error);
    } finally {
      setIsloading(false); // Hide the loader
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <div className="order_wrape">
      <h4 className="title">Orders</h4>
      {isloading ? (
        <p>loading...</p>
      ) : (
        <>
          {orderList?.length === 0 ? (
            <>
              <p>No order has been made yet!</p>
              <Button onClick={() => navigate("/shop")} className="btn_submit">
                Go to Shop
              </Button>
            </>
          ) : (
            <div className="row order_item_wrape gy-4">
              {orderList?.map((x) => (
                <div className="col-12 col-md-6" sm={12} md={6} key={x?.id}>
                  <div className="order_item">
                    <div className="img_wrape">
                      {x?.order_details?.length ? (
                        <img
                          src={`${process.env.REACT_APP_IMAGE_BASE_URL}/${x?.order_details[0]?.products[0]?.featured_img}`}
                          alt="User"
                          className="img-fluid"
                        />
                      ) : null}
                      <div className="btn_wrape">
                        {x?.status === "ORDERPLACED" ? (
                          <Button
                            onClick={() => navigate(`/account/order/${x?.id}`)}
                            className="btn_submit"
                          >
                            View Order
                          </Button>
                        ) : x?.status === "SUCCESS" ? (
                          <>
                            <Button
                              onClick={() =>
                                navigate(`/account/track-order/${x?.id}`)
                              }
                              className="btn_submit"
                            >
                              Track Order
                            </Button>
                            <Button
                              onClick={() =>
                                navigate(`/account/order/${x?.id}`)
                              }
                              className="btn_order"
                            >
                              View Order
                            </Button>
                          </>
                        ) : x?.status === "PENDING" ? (
                          <>
                            <Button
                              onClick={() =>
                                navigate(`/account/order/${x?.id}`)
                              }
                              className="btn_submit"
                            >
                              View Order
                            </Button>
                            <Button
                              onClick={() =>
                                navigate(`/account/order/${x?.id}`)
                              }
                              className="btn_order text-danger"
                            >
                              Cancel Order
                            </Button>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="order_detail">
                      <div className="order_number">
                        Order Number <br />
                        <p>{x?.order_number}</p>
                      </div>
                      <div className="order_number">
                        Shipped Date <br />
                        <span>
                          {moment(x?.updated_at).format("DD/MM/YYYY")}
                        </span>
                      </div>
                      <div className="order_number">
                        Total <br />
                        <span>
                          {x?.currency} {x?.total_amount}
                        </span>
                      </div>
                      <div className="order_number">
                        Status <br />
                        {x?.status === "ORDERPLACED" ? (
                          <span className="text-info">Order Placed</span>
                        ) : x?.status === "ORDERDISPATCHED" ? (
                          <span className="text-info">Order Dispatched</span>
                        ) : x?.status === "ORDERDELIVERED" ? (
                          <span className="text-success">Order Delivered</span>
                        ) : (
                          <span className="text-danger">Order Canceled</span>
                        )}
                      </div>
                      {x?.tracking_number && (
                        <div className="order_number">
                          Tracking No: <br />
                          <p>{x?.tracking_number}</p>
                        </div>
                      )}
                      {x?.logistics_partner_name && (
                        <div className="order_number">
                          Logistic Partner <br />
                          <span>{x?.logistics_partner_name}</span>
                        </div>
                      )}
                      {x?.logistics_partner_link && (
                        <div className="order_number">
                          Logistic Partner Link: <br />
                          <a href={x?.logistics_partner_link} target="__blank">
                            Click Here
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Order;
