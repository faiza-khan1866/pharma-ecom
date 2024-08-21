import React, { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import "./BackToTop.scss";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);
  return (
    <div className="back-to-top">
      {isVisible && (
        <div className="outer-circle" onClick={scrollToTop}>
          <div className="circle">
            <AiOutlineArrowUp color="#ffffff" />
          </div>
        </div>
      )}
    </div>
  );
};

export default BackToTop;
