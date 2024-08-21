import React, { useState, useEffect } from "react";
import sliderImg from "../../../assets/images/products/productDetail.png";
import ImageGallery from "react-image-gallery";
import "./ProductSlider.scss";

const ProductSlider = ({ sliderImages }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (sliderImages) {
      const newImages = sliderImages?.map((x) => ({
        original: x ? process.env.REACT_APP_IMAGE_BASE_URL + x : sliderImg,
        thumbnail: x ? process.env.REACT_APP_IMAGE_BASE_URL + x : sliderImg,
      }));
      setImages(newImages);
    }
  }, [sliderImages]);

  return (
    <div
      className="product-slider-wrape"
      data-aos="fade-down"
      data-aos-once="true"
    >
      <ImageGallery
        items={images}
        showNav={false}
        showPlayButton={false}
        lazyLoad={true}
      />
    </div>
  );
};

export default ProductSlider;
