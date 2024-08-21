import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUserData } from "../../http/apiService";
import { useSelector, useDispatch } from "react-redux";

const DashBoard = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  let auth_token = useSelector((state) => state.user.auth_token);

  useEffect(() => {
    let header = {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    };
    const fetchDashboardData = async () => {
      try {
        const { data } = await fetchUserData(header);
        setUserData(data);
        dispatch({
          type: "user/userInfo",
          payload: data,
        });
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };

    fetchDashboardData();
  }, []);
  return (
    <div className="dashboard_wrape">
      <h4 className="title">
        Welcome ,{" "}
        <span>
          {userData?.first_name} {userData?.last_name}.
        </span>
      </h4>
      <p>
        From your account dashboard you can view your{" "}
        <Link to="/account/orders">recent orders</Link> manage your{" "}
        <Link to="/account/address">shipping and billing addresses</Link> and{" "}
        <Link to="/account/change-password">change your password</Link> and{" "}
        <Link to="/account/account-details">edit your account details</Link>.
      </p>
    </div>
  );
};

export default DashBoard;
