import React, { lazy } from "react";
import { Helmet } from "react-helmet";
import { breadCrumbs } from "../../config/breadCrumbs";

const OrderTrackingArea = lazy(() =>
  import("../../sections/MyAccountDashboard/OrderTracking")
);
const BreadCrumbs = lazy(() =>
  import("../../components/BreadCrumbs/BreadCrumbs")
);

const OrderTracking = () => {
  return (
    <>
      <Helmet>
        <title>Order Tracking | MediExpress</title>
        <meta name="description" content="Order Tracking" />
      </Helmet>
      <BreadCrumbs breadCrumbItems={breadCrumbs["orderTrack"]} />
      <OrderTrackingArea />
    </>
  );
};

export default OrderTracking;
