import React, { lazy } from "react";
import { Helmet } from "react-helmet";
import { breadCrumbs } from "../../config/breadCrumbs";

const Layout = lazy(() => import("../../sections/MyAccountDashboard/Layout"));
const AccountDetailsArea = lazy(() =>
  import("../../sections/MyAccountDashboard/AccountDetails")
);
const BreadCrumbs = lazy(() =>
  import("../../components/BreadCrumbs/BreadCrumbs")
);

const AccountDetails = () => {
  return (
    <>
      <Helmet>
        <title>Account Details | MediExpress</title>
        <meta name="description" content="Account Details" />
      </Helmet>
      <BreadCrumbs breadCrumbItems={breadCrumbs["accountDetails"]} />
      <Layout>
        <AccountDetailsArea />
      </Layout>
    </>
  );
};

export default AccountDetails;
