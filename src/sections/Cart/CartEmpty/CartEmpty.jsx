import React from "react";
import { Container } from "react-bootstrap";
import emptycart from "../../../assets/images/Frame.png";
import promoBanner from "../../../assets/images/promo/promocart.png";
import { SiAdguard } from "react-icons/si";
import "./CartEmpty.scss";

function CartEmpty() {
  return (
    <section id="cart_empty">
      <Container>
        <h2 className="main_title" data-aos="fade-down" data-aos-once="true">
          Shopping Cart
        </h2>

        <div
          className="cartEmptyWrapper"
          data-aos="fade-up"
          data-aos-once="true"
        >
          <img src={emptycart} alt="empty-cart" />
          <h4 className="mt-3"> No Product In cart</h4>
          <div className="promoBanner">
            <div className="PromobannerWrapper">
              <h3 className="PromoBanner_title">
                <span className="icon">
                  <SiAdguard />
                </span>
                <span className="secure_title">100% Secure delivery </span>{" "}
                without contacting the courier
              </h3>
              <button className="more_btn">More</button>
            </div>
            {/* <img src={promoBanner} alt="promo-banner" /> */}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CartEmpty;
