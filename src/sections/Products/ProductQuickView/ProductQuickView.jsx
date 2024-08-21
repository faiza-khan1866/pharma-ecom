import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Row, Col, Container } from "react-bootstrap";
import product from "../../../assets/images/products/productView.png";
import { MdClose } from "react-icons/md";
import { AiOutlineShopping, AiOutlineHeart } from "react-icons/ai";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import { Rate } from "antd";
import ImageGallery from "react-image-gallery";
import { fetchProductPopUpData } from "../../../http/apiService";
import DataLoader from "../../../components/Loader/DataLoader";
import useCart from "../../../hooks/useCart";
import useWishlist from "../../../hooks/useWishlist";
import { GeneralContext } from "../../../context/GeneralContext";
import "./ProductQuickView.scss";

const ProductQuickView = (props) => {
  const { addToCart } = useCart();
  const { countryData } = useContext(GeneralContext);
  const [productData, setProductData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const { addtoWishList } = useWishlist();

  useEffect(() => {
    if (countryData?.ip) {
      const fetchProductQuickViewData = async () => {
        try {
          setIsLoading(true); // Show the loader

          const response = await fetchProductPopUpData(
            props?.productId,
            props?.countryName
          );
          const data = response.data;
          setProductData(data);
        } catch (error) {
          console.error("Error fetching Data:", error);
        } finally {
          setIsLoading(false); // Hide the loader
        }
      };

      fetchProductQuickViewData();
    }
  }, [props?.productId, countryData]);

  useEffect(() => {
    if (productData.slider_img) {
      const newImages = productData?.slider_img?.map((x) => ({
        original: x ? process.env.REACT_APP_IMAGE_BASE_URL + x : product,
        thumbnail: x ? process.env.REACT_APP_IMAGE_BASE_URL + x : product,
      }));
      setImages(newImages);
    }
  }, [productData.slider_img]);

  const stockStatus = productData?.stock === "0" ? "Out of Stock" : "In Stock";

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="product_quick_view_wraper"
      backdrop="static"
    >
      <Modal.Body>
        <p className="text-end p-1 m-0">
          <MdClose
            fontSize="24px"
            className="closeIcon"
            onClick={props?.onHide}
          />
        </p>
        <Container>
          {isLoading ? (
            <DataLoader />
          ) : (
            <Row>
              <Col sm={12} lg={6}>
                <ImageGallery
                  items={images}
                  showNav={false}
                  showPlayButton={false}
                  lazyLoad={true}
                />
              </Col>
              <Col sm>
                <div
                  className="product_detail_wraper"
                  data-aos="fade-up"
                  data-aos-once="true"
                >
                  {productData?.price?.[0]?.sale_price != 0 ||
                  productData?.price?.[0]?.deal_price != 0 ? (
                    <span className="discount">
                      {Math.round(
                        ((parseFloat(productData?.price?.[0]?.actual_price) -
                          (parseFloat(productData?.price?.[0]?.deal_price) ||
                            parseFloat(productData?.price?.[0]?.sale_price))) /
                          parseFloat(productData?.price?.[0]?.actual_price)) *
                          100
                      )}
                      % off
                    </span>
                  ) : null}
                  <h3>{productData?.name}</h3>
                  <p className="price">
                    {productData?.price?.[0]?.country?.currency}{" "}
                    {productData?.price?.[0]?.sale_price != 0
                      ? productData?.price?.[0]?.sale_price
                      : productData?.price?.[0]?.deal_price != 0
                      ? productData?.price?.[0]?.deal_price
                      : productData?.price?.[0]?.actual_price}{" "}
                    {productData?.price?.[0]?.deal_price != 0 ||
                    productData?.price?.[0]?.sale_price != 0 ? (
                      <del>
                        {productData?.price?.[0]?.country?.currency}{" "}
                        {productData?.price?.[0]?.actual_price}
                      </del>
                    ) : (
                      ""
                    )}
                  </p>
                  {productData?.review_count !== 0 && (
                    <p className="rating">
                      <Rate
                        allowHalf
                        disabled
                        defaultValue={productData?.total_review}
                        className="rat_icon"
                      />{" "}
                      ({productData?.review_count} customer reviews)
                    </p>
                  )}

                  <p
                    className="detail"
                    dangerouslySetInnerHTML={{
                      __html:
                        productData?.short_description?.slice(0, 250) + "...",
                    }}
                  />
                  <ul className="list_style">
                    <li>
                      <span>SKU:</span> {productData?.sku}
                    </li>
                    <li>
                      <span>Availability:</span>{" "}
                      <span
                        className={
                          productData?.stock === "0" ? "out_stock" : "in_stock"
                        }
                      >
                        {stockStatus}
                      </span>
                    </li>
                    {productData?.shipping_charges
                      ?.standard_shipping_charges && (
                      <li>
                        <span>Standard Shipping Charges:</span> AED{" "}
                        {
                          productData?.shipping_charges
                            ?.standard_shipping_charges
                        }
                      </li>
                    )}
                    {productData?.shipping_charges
                      ?.express_shipping_charges && (
                      <li>
                        <span>Express Shipping Charges:</span> AED{" "}
                        {
                          productData?.shipping_charges
                            ?.express_shipping_charges
                        }
                      </li>
                    )}
                    <li>
                      <span>Categories:</span>{" "}
                      {productData?.category?.map((t, index) => (
                        <span key={index} className="subCat">
                          {t?.name}
                          {index === productData?.category?.length - 1
                            ? ""
                            : ", "}
                        </span>
                      ))}
                    </li>
                    <li>
                      <span>Share:</span>{" "}
                      <FacebookShareButton
                        url={`https://medi-express.prismcloudhosting.com/product/${productData?.route}`}
                        quote={productData?.name}
                        hashtag="#MEDIEXPRESS"
                      >
                        <FacebookIcon size={20} round={true} />
                      </FacebookShareButton>{" "}
                      <TwitterShareButton
                        url={`https://medi-express.prismcloudhosting.com/product/${productData?.route}`}
                        title={productData?.name}
                        hashtags={["MEDIEXPRESS", "Product"]}
                      >
                        <TwitterIcon size={20} round={true} />
                      </TwitterShareButton>{" "}
                      <LinkedinShareButton
                        url={`https://medi-express.prismcloudhosting.com/product/${productData?.route}`}
                        title={productData?.name}
                        summary={productData?.short_description}
                      >
                        <LinkedinIcon size={20} round={true} />
                      </LinkedinShareButton>{" "}
                      <WhatsappShareButton
                        url={`https://medi-express.prismcloudhosting.com/product/${productData?.route}`}
                        title={productData?.name}
                      >
                        <WhatsappIcon size={20} round={true} />
                      </WhatsappShareButton>
                    </li>
                  </ul>
                  <Button
                    className="cart_btn"
                    onClick={() => {
                      addToCart(productData, productData?.price?.[0]);
                    }}
                  >
                    Add To Cart <AiOutlineShopping fontSize="20px" />
                  </Button>
                  <Button
                    className="wish_btn"
                    onClick={() => {
                      addtoWishList(productData);
                    }}
                  >
                    Add To Wishlist <AiOutlineHeart fontSize="20px" />
                  </Button>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ProductQuickView;
