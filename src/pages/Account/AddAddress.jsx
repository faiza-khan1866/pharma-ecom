import React, { lazy } from "react";
import { Helmet } from "react-helmet";
import { breadCrumbs } from "../../config/breadCrumbs";

const Layout = lazy(() => import("../../sections/MyAccountDashboard/Layout"));
const AddAddressArea = lazy(() =>
  import("../../sections/MyAccountDashboard/AddAddress")
);
const BreadCrumbs = lazy(() =>
  import("../../components/BreadCrumbs/BreadCrumbs")
);

const AddAddress = () => {
  return (
    <>
      <Helmet>
        <title>Add Address | MediExpress</title>
        <meta name="description" content="Add Address" />
      </Helmet>
      <BreadCrumbs breadCrumbItems={breadCrumbs["addAddress"]} />
      <Layout>
        <AddAddressArea />
      </Layout>
    </>
  );
};

export default AddAddress;
