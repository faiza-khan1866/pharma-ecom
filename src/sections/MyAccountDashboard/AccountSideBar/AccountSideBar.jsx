import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiLock } from "react-icons/ci";
import { HiOutlineUserCircle } from "react-icons/hi";
import { AiOutlineHome } from "react-icons/ai";
import { MdLogout, MdOutlineDashboard } from "react-icons/md";
import { BsBox } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useContext } from "react";
import { GeneralContext } from "../../../context/GeneralContext";
import "./AccountSideBar.scss";

const AccountSideBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setUserData } = useContext(GeneralContext);

  const logout = () => {
    toast.success("Logout Successfully!");
    dispatch({
      type: "user/logOutUser",
    });
    setUserData({
      auth_token: null,
      isAuthenticated: false,
      pageShow: false,
      userData: {},
    });
    navigate("/login");
  };
  return (
    <div className="account_sidebar" data-aos="fade-down" data-aos-once="true">
      <ul role="tablist" className="nav flex-column">
        <li>
          <Link
            to={`/account`}
            className={location.pathname === `/account` ? "active" : null}
          >
            <MdOutlineDashboard className="icon_style" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to={`/account/orders`}
            className={
              location.pathname === `/account/orders` ? "active" : null
            }
          >
            <BsBox className="icon_style" /> Orders
          </Link>
        </li>
        <li>
          <Link
            to={`/account/address`}
            className={
              location.pathname === `/account/address` ? "active" : null
            }
          >
            <AiOutlineHome className="icon_style" />
            Addresses
          </Link>
        </li>
        <li>
          <Link
            to={`/account/account-details`}
            className={
              location.pathname === `/account/account-details` ? "active" : null
            }
          >
            <HiOutlineUserCircle className="icon_style" />
            Account details
          </Link>
        </li>
        <li>
          <Link
            to={`/account/change-password`}
            className={
              location.pathname === `/account/change-password` ? "active" : null
            }
          >
            <CiLock className="icon_style" />
            Change Password
          </Link>
        </li>
        <li>
          <Link
            to="/#!"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            <MdLogout className="icon_style" />
            Sign Out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AccountSideBar;
