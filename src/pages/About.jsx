import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchAboutData } from "../http/apiService";
import Loader from "../components/Loader/PagesLoader";
import AboutBanner from "../sections/About/AboutBanner";
import AboutUsDetails from "../sections/About/AboutUsDetails";
import IntroVideo from "../sections/About/AboutIntroVideo/IntroVideo";
import OurClients from "../sections/Home/OurClients";
import Features from "../sections/Home/Features";
import Subscribe from "../sections/Home/Subscribe";

const About = () => {
  const [aboutData, setAboutData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchABoutPageData = async () => {
      try {
        setIsLoading(true); // Show the loader

        const response = await fetchAboutData();
        setAboutData(response?.data?.content);
      } catch (error) {
        console.error("Error fetching Data:", error);
      } finally {
        setIsLoading(false); // Hide the loader
      }
    };

    fetchABoutPageData();
  }, []);

  return (
    <Loader isLoading={isLoading}>
      <Helmet>
        <title>About Us | MediExpress</title>
        <meta name="description" content="About Us" />
      </Helmet>
      <AboutBanner bannerData={aboutData?.banerSection} />
      <AboutUsDetails introData={aboutData?.aboutUsSection} />
      <IntroVideo videoIntro={aboutData?.video_intro} />
      <OurClients />
      <Features />
      <Subscribe />
    </Loader>
  );
};
export default About;
