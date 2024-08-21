import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchDeliveryInformationData } from "../http/apiService";
import Loader from "../components/Loader/PagesLoader";
import { breadCrumbs } from "../config/breadCrumbs";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import IntroCommon from "../sections/PrivacyPolicy";
import Subscribe from "../sections/Home/Subscribe";

const DeliveryInformation = () => {
  const [deliveryInformationData, setDeliveryInformationData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchDeliveryInformationPageData = async () => {
      try {
        setIsLoading(true); // Show the loader

        const response = await fetchDeliveryInformationData();
        setDeliveryInformationData(response?.data?.content);
      } catch (error) {
        console.error("Error fetching Data:", error);
      } finally {
        setIsLoading(false); // Hide the loader
      }
    };

    fetchDeliveryInformationPageData();
  }, []);

  return (
    <Loader isLoading={isLoading}>
      <Helmet>
        <title>Delivery Information | MediExpress</title>
        <meta name="description" content="Delivery Information" />
      </Helmet>
      <BreadCrumbs breadCrumbItems={breadCrumbs["deliveryInfo"]} />
      <IntroCommon introData={deliveryInformationData?.aboutSection} />
      <Subscribe />
    </Loader>
  );
};
export default DeliveryInformation;
