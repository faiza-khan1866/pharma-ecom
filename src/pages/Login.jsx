import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import LoginSection from "../sections/Login";

const Login = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Helmet>
        <title>Login | MediExpress</title>
        <meta name="description" content="Login" />
      </Helmet>
      <LoginSection />
    </>
  );
};
export default Login;
