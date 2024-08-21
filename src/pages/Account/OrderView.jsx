import React, { lazy } from "react";
import { Helmet } from "react-helmet";
import { breadCrumbs } from "../../config/breadCrumbs";

const OrderViewArea = lazy(() =>
  import("../../sections/MyAccountDashboard/OrderView")
);
const BreadCrumbs = lazy(() =>
  import("../../components/BreadCrumbs/BreadCrumbs")
);

const OrderView = () => {
  return (
    <>
      <Helmet>
        <title>Order Details | MediExpress</title>
        <meta name="description" content="Order Details" />
      </Helmet>
      <BreadCrumbs breadCrumbItems={breadCrumbs["orderView"]} />
      <OrderViewArea />
    </>
  );
};

export default OrderView;
