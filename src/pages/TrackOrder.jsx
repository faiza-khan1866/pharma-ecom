import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { breadCrumbs } from "../config/breadCrumbs";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import TrackOrderArea from "../sections/TrackOrder";
import Subscribe from "../sections/Home/Subscribe";

const TrackOrder = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Helmet>
        <title>Order Tracking | MediExpress</title>
        <meta name="description" content="Order Tracking" />
      </Helmet>
      <BreadCrumbs breadCrumbItems={breadCrumbs["trackOrder"]} />
      <TrackOrderArea />
      <Subscribe />
    </>
  );
};

export default TrackOrder;
