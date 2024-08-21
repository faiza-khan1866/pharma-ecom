import React, { lazy } from "react";
import { Helmet } from "react-helmet";
import { breadCrumbs } from "../../config/breadCrumbs";

const Layout = lazy(() => import("../../sections/MyAccountDashboard/Layout"));
const ChangePasswordArea = lazy(() =>
  import("../../sections/MyAccountDashboard/ChangePassword")
);
const BreadCrumbs = lazy(() =>
  import("../../components/BreadCrumbs/BreadCrumbs")
);

const ChangePassword = () => {
  return (
    <>
      <Helmet>
        <title>Change Password | MediExpress</title>
        <meta name="description" content="Change Password" />
      </Helmet>
      <BreadCrumbs breadCrumbItems={breadCrumbs["changePassword"]} />
      <Layout>
        <ChangePasswordArea />
      </Layout>
    </>
  );
};

export default ChangePassword;
