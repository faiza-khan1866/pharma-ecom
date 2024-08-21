import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { breadCrumbs } from "../config/breadCrumbs";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import OrderCompletedArea from "../sections/OrderCompleted";
import Subscribe from "../sections/Home/Subscribe";

const OrderCompleted = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Helmet>
        <title>Order Completed | MediExpress</title>
        <meta name="description" content="Order Completed" />
      </Helmet>
      <BreadCrumbs breadCrumbItems={breadCrumbs["orderCompleted"]} />
      <OrderCompletedArea />
      <Subscribe />
    </>
  );
};

export default OrderCompleted;
