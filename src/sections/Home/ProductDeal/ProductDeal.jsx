import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import productDeal1 from "../../../assets/images/products/productDeal1.png";
import "./ProductDeal.scss";

const ProductDeal = ({ promoDealsData }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="product_deal_wrape mb-60">
        <Row className="align-items-center">
          {promoDealsData?.map((x, i) => (
            <Col sm key={i} className="promo_mbl_space">
              <div
                data-aos="fade-up"
                data-aos-once="true"
                className="image-container"
                style={{
                  backgroundImage: x?.BannerImage
                    ? `url(${
                        process.env.REACT_APP_IMAGE_BASE_URL + x?.BannerImage
                      })`
                    : `url(${productDeal1})`,
                }}
              >
                <div className="description-wrape">
                  <span className="new_badge">
                    {x?.isnew == "true" ? "New" : "Old"}
                  </span>
                  <h2
                    className="title"
                    dangerouslySetInnerHTML={{ __html: x?.title }}
                  />
                  <Button
                    className="shop_btn"
                    onClick={() => navigate(`/${x?.buttonRoute}`)}
                  >
                    {x?.buttonText}
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default ProductDeal;
