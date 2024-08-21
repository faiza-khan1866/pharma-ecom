import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchSalesData } from "../http/apiService";
import Loader from "../components/Loader/PagesLoader";
import { breadCrumbs } from "../config/breadCrumbs";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import IntroCommon from "../sections/PrivacyPolicy";
import Subscribe from "../sections/Home/Subscribe";

const Sales = () => {
  const [salesData, setSalesData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchSalesPageData = async () => {
      try {
        setIsLoading(true); // Show the loader

        const response = await fetchSalesData();
        setSalesData(response?.data?.content);
      } catch (error) {
        console.error("Error fetching Data:", error);
      } finally {
        setIsLoading(false); // Hide the loader
      }
    };

    fetchSalesPageData();
  }, []);

  return (
    <Loader isLoading={isLoading}>
      <Helmet>
        <title>Sales | MediExpress</title>
        <meta name="description" content="Sales" />
      </Helmet>
      <BreadCrumbs breadCrumbItems={breadCrumbs["sales"]} />
      <IntroCommon introData={salesData?.aboutSection} />
      <Subscribe />
    </Loader>
  );
};
export default Sales;
