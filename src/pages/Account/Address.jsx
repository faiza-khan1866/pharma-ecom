import React, { lazy } from "react";
import { Helmet } from "react-helmet";
import { breadCrumbs } from "../../config/breadCrumbs";

const Layout = lazy(() => import("../../sections/MyAccountDashboard/Layout"));
const AddressArea = lazy(() =>
  import("../../sections/MyAccountDashboard/Address")
);
const BreadCrumbs = lazy(() =>
  import("../../components/BreadCrumbs/BreadCrumbs")
);

const Address = () => {
  return (
    <>
      <Helmet>
        <title>Manage Address | MediExpress</title>
        <meta name="description" content="Manage Address" />
      </Helmet>
      <BreadCrumbs breadCrumbItems={breadCrumbs["address"]} />
      <Layout>
        <AddressArea />
      </Layout>
    </>
  );
};

export default Address;
