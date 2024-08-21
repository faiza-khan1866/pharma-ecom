import React, { lazy } from "react";
import { Helmet } from "react-helmet";
import { breadCrumbs } from "../../config/breadCrumbs";

const Layout = lazy(() => import("../../sections/MyAccountDashboard/Layout"));
const Dashboard = lazy(() =>
  import("../../sections/MyAccountDashboard/DashBoard")
);
const BreadCrumbs = lazy(() =>
  import("../../components/BreadCrumbs/BreadCrumbs")
);

const MyAccount = () => {
  return (
    <>
      <Helmet>
        <title>My Account | MediExpress</title>
        <meta name="description" content="My Account" />
      </Helmet>
      <BreadCrumbs breadCrumbItems={breadCrumbs["myAccount"]} />
      <Layout>
        <Dashboard />
      </Layout>
    </>
  );
};

export default MyAccount;
