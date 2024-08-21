import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { breadCrumbs } from "../../config/breadCrumbs";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import CartMain from "../../sections/Cart/CartMain/CartMain";

function Cart() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Helmet>
        <title>Shopping Cart | MediExpress</title>
        <meta name="description" content="Shopping Cart" />
      </Helmet>
      <BreadCrumbs breadCrumbItems={breadCrumbs["cart"]} />
      <CartMain />
    </>
  );
}

export default Cart;
