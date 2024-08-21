import React from "react";
import { Container } from "react-bootstrap";
import PromoBanner from "../../../components/PromoBanner/PromoBanner";
import imageEmpty from "../../../assets/images/Frame 144.png";
import "./WishlistEmpty.scss";

function WishlistEmpty() {
  return (
    <section id="wishlist_empty">
      <Container>
        <h2 className="main_title" data-aos="fade-down" data-aos-once="true">
          Wishlist
        </h2>

        <div className="wrapper-empty" data-aos="fade-up" data-aos-once="true">
          <div className="image_wrapper img-fluid">
            <img src={imageEmpty} alt="Empty" />
          </div>
          <h4 className="mt-3">No product in Wishlist.</h4>
          <PromoBanner />
        </div>
      </Container>
    </section>
  );
}

export default WishlistEmpty;
