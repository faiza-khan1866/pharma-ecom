import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchPrivacyPolicyData } from "../http/apiService";
import Loader from "../components/Loader/PagesLoader";
import { breadCrumbs } from "../config/breadCrumbs";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import IntroCommon from "../sections/PrivacyPolicy";
import Subscribe from "../sections/Home/Subscribe";

const PrivacyPolicy = () => {
  const [privacyPolicyData, setPrivacyPolicyData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchPrivacyPolicyPageData = async () => {
      try {
        setIsLoading(true); // Show the loader

        const response = await fetchPrivacyPolicyData();
        setPrivacyPolicyData(response?.data?.content);
      } catch (error) {
        console.error("Error fetching Data:", error);
      } finally {
        setIsLoading(false); // Hide the loader
      }
    };

    fetchPrivacyPolicyPageData();
  }, []);

  return (
    <Loader isLoading={isLoading}>
      <Helmet>
        <title>Privacy Policy | MediExpress</title>
        <meta name="description" content="Privacy Policy" />
      </Helmet>
      <BreadCrumbs breadCrumbItems={breadCrumbs["privacyPolicy"]} />
      <IntroCommon introData={privacyPolicyData?.aboutSection} />
      <Subscribe />
    </Loader>
  );
};
export default PrivacyPolicy;
