import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import RegisterSection from "../sections/Register";

const Register = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Helmet>
        <title>Register | MediExpress</title>
        <meta name="description" content="Register" />
      </Helmet>
      <RegisterSection />
    </>
  );
};
export default Register;
