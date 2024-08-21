import React from "react";
import whatsappgif from "../../assets/images/icons/whatsapp1.webp";
import "./FloatingIcon.scss";

const FloatingIcon = () => {
  return (
    <div className="floating_icon_wrape">
      <a
        href={"https://wa.me/+23054850037"}
        className="contact-pannel-btn text-decoration-none"
        target={"_blank"}
      >
        <figure>
          <img src={whatsappgif} loading="lazy" alt="whatsapp" />
        </figure>
      </a>
    </div>
  );
};

export default FloatingIcon;
