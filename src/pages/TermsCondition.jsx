import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchTermsConditionsData } from "../http/apiService";
import Loader from "../components/Loader/PagesLoader";
import { breadCrumbs } from "../config/breadCrumbs";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import IntroCommon from "../sections/PrivacyPolicy";
import Subscribe from "../sections/Home/Subscribe";

const TermsCondition = () => {
  const [termsConditionsData, setTermsConditionsData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchTermsConditionsPageData = async () => {
      try {
        setIsLoading(true); // Show the loader

        const response = await fetchTermsConditionsData();
        setTermsConditionsData(response?.data?.content);
      } catch (error) {
        console.error("Error fetching Data:", error);
      } finally {
        setIsLoading(false); // Hide the loader
      }
    };

    fetchTermsConditionsPageData();
  }, []);

  return (
    <Loader isLoading={isLoading}>
      <Helmet>
        <title>Terms & Conditions | MediExpress</title>
        <meta name="description" content="Terms & Conditions" />
      </Helmet>
      <BreadCrumbs breadCrumbItems={breadCrumbs["termsConditions"]} />
      <IntroCommon introData={termsConditionsData?.aboutSection} />
      <Subscribe />
    </Loader>
  );
};
export default TermsCondition;
