import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchFaqData } from "../http/apiService";
import FaqSection from "../sections/Faq";
import Loader from "../components/Loader/PagesLoader";
import { breadCrumbs } from "../config/breadCrumbs";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";

const Faq = () => {
  const [faqData, setFaqData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchFaqPageData = async () => {
      try {
        setIsLoading(true); // Show the loader

        const response = await fetchFaqData();
        setFaqData(response?.data?.content);
      } catch (error) {
        console.error("Error fetching Data:", error);
      } finally {
        setIsLoading(false); // Hide the loader
      }
    };

    fetchFaqPageData();
  }, []);

  return (
    <Loader isLoading={isLoading}>
      <Helmet>
        <title>FAQ's | MediExpress</title>
        <meta name="description" content="FAQ's" />
      </Helmet>
      <BreadCrumbs breadCrumbItems={breadCrumbs["faq"]} />
      <FaqSection faqData={faqData?.faq} />
    </Loader>
  );
};
export default Faq;
