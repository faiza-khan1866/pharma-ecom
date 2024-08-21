import React from "react";
import MainNavbar from "./MainNavbar/MainNavbar";
import BackToTop from "../components/BackToTop/BackToTop";
import FloatingIcon from "../components/FloatingIcon/FloatingIcon";
import Footer from "./Footer/Footer";
import BottomTabNavigator from "../components/BottomTabNavigator/BottomTabNavigator";

const Layout = (props) => {
  return (
    <div>
      <MainNavbar />
      {props.children}
      <BackToTop />
      <FloatingIcon />
      <Footer />
      <BottomTabNavigator />
    </div>
  );
};
export default Layout;
