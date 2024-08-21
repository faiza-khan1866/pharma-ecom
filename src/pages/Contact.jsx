import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import ContactMap from "../sections/Contact/ContactMap";
import ContactUsForm from "../sections/Contact/ContactUsForm";
import Subscribe from "../sections/Home/Subscribe";

const Contact = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Helmet>
        <title>Contact Us | MediExpress</title>
        <meta name="description" content="Contact Us" />
      </Helmet>
      <ContactMap />
      <ContactUsForm />
      <Subscribe />
    </>
  );
};

export default Contact;
