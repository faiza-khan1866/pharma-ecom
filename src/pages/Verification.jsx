import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import VerificationSection from "../sections/Verification";

const Verification = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Helmet>
        <title>Verification | MediExpress</title>
        <meta name="description" content="Verification" />
      </Helmet>
      <VerificationSection />
    </>
  );
};
export default Verification;
