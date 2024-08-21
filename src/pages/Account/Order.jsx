import React, { lazy } from "react";
import { Helmet } from "react-helmet";
import { breadCrumbs } from "../../config/breadCrumbs";

const Layout = lazy(() => import("../../sections/MyAccountDashboard/Layout"));
const OrderArea = lazy(() => import("../../sections/MyAccountDashboard/Order"));
const BreadCrumbs = lazy(() =>
  import("../../components/BreadCrumbs/BreadCrumbs")
);

const Orders = () => {
  return (
    <>
      <Helmet>
        <title>Orders | MediExpress</title>
        <meta name="description" content="Orders" />
      </Helmet>
      <BreadCrumbs breadCrumbItems={breadCrumbs["orders"]} />
      <Layout>
        <OrderArea />
      </Layout>
    </>
  );
};

export default Orders;
