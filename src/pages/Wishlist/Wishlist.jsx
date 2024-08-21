import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { breadCrumbs } from "../../config/breadCrumbs";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import WishlistMain from "../../sections/Wishlist/WishlistMain/WishlistMain";

function Wishlist() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Helmet>
        <title>Wishlist | MediExpress</title>
        <meta name="description" content="Wishlist" />
      </Helmet>
      <BreadCrumbs breadCrumbItems={breadCrumbs["wishlist"]} />
      <WishlistMain />
    </>
  );
}

export default Wishlist;
