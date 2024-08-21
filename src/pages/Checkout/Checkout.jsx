import React, { useEffect, useContext, useState } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { createMostPurchasedProductsData } from "../../http/apiService";
import { GeneralContext } from "../../context/GeneralContext";
import { breadCrumbs } from "../../config/breadCrumbs";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import CheckoutMain from "../../sections/Checkout/CheckoutMain/CheckoutMain";
import FeaturedProducts from "../../sections/Home/FeaturedProducts";

function Checkout() {
  const { countryData } = useContext(GeneralContext);
  const [featuredData, setFeaturedData] = useState([]);

  useEffect(() => {
    if (countryData?.ip) {
      const fetchFeaturedProductListData = async () => {
        let formData = {
          country_id: countryData?.country_name,
        };
        try {
          const response = await createMostPurchasedProductsData(formData);
          if (response?.data?.code) {
            setFeaturedData([]);
          } else {
            setFeaturedData(
              response?.data?.filter((product) => product?.price?.length > 0)
            );
          }
        } catch (error) {
          console.error("Error fetching Data:", error);
        }
      };
      fetchFeaturedProductListData();
    }
  }, [countryData]);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Helmet>
        <title>Checkout | MediExpress</title>
        <meta name="description" content="Checkout" />
      </Helmet>
      <BreadCrumbs breadCrumbItems={breadCrumbs["checkout"]} />
      <CheckoutMain />
      <FeaturedProducts featuredData={featuredData} />
    </>
  );
}

export default Checkout;
