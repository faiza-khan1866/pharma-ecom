import React from "react";
import { SiAdguard } from "react-icons/si";
import "./PromoBanner.scss";

function PromoBanner(props) {
  return (
    <div className="promoBanner" data-aos="fade-up" data-aos-once="true">
      <div className="PromobannerWrapper">
        <h3 className="PromoBanner_title">
          <span className="icon">
            <SiAdguard />
          </span>
          <span className="secure_title">100% Secure delivery </span> without
          contacting the courier
        </h3>
        <button className="more_btn">More</button>
      </div>
    </div>
  );
}

export default PromoBanner;
