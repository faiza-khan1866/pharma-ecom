import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import category1 from "../../../assets/images/categories/men-health.webp";
import category2 from "../../../assets/images/categories/beauty-skin-care.webp";
import category3 from "../../../assets/images/categories/general-health.webp";
import category4 from "../../../assets/images/categories/women-health.webp";
import "./FeaturedCategories.scss";

const FeaturedCategories = () => {
  const navigate = useNavigate();
  const categoryData = [
    {
      id: 1,
      name: "Men's Health",
      route: "men's-health",
      featured_img: category1,
    },
    {
      id: 2,
      name: "Beauty & Skin Care",
      route: "beauty-&-skin-care",
      featured_img: category2,
    },
    {
      id: 3,
      name: "General Health",
      route: "general-health",
      featured_img: category3,
    },
    {
      id: 13,
      name: "Women's Health",
      route: "women's-health",
      featured_img: category4,
    },
    // {
    //   id: 4,
    //   name: "Anti Cancer",
    //   route: "anti-cancer",
    // },
    // {
    //   id: 5,
    //   name: "Narcolepsy",
    //   route: "narcolepsy",
    // },
    // {
    //   id: 6,
    //   name: "New Products",
    //   route: "new-products",
    // },
    // {
    //   id: 7,
    //   name: "Offers",
    //   route: "offers",
    // },
    // {
    //   id: 8,
    //   name: "Others",
    //   route: "others",
    // },
    // {
    //   id: 9,
    //   name: "Pain Relief",
    //   route: "pain-relief",
    // },
    // {
    //   id: 10,
    //   name: "Rehabilitation Care",
    //   route: "rehabilitation-care",
    // },
    // {
    //   id: 11,
    //   name: "Respiratory",
    //   route: "respiratory",
    // },
    // {
    //   id: 12,
    //   name: "Weight Loss",
    //   route: "weight-loss",
    // },
  ];

  return (
    <div className="featured_categories_wraper mtb-60">
      <Container>
        <div className="title-wrap">
          <h2 data-aos="fade-down" data-aos-once="true">
            Explore Popular Categories
          </h2>
          <Button
            className="view_all_btn d-none d-sm-block"
            onClick={() => navigate("/shop")}
          >
            View all
          </Button>
        </div>
        <Row>
          {categoryData?.slice(0, 4)?.map((x, i) => (
            <Col sm={6} lg={3} key={i} className="container-fluid">
              <div
                className="img_wraper"
                data-aos="fade-up"
                data-aos-once="true"
              >
                <figure>
                  <img src={x?.featured_img} alt="thumbnail" />
                </figure>
                <div className="detail_wraper">
                  <h3>{x?.name}</h3>
                  <Button
                    className="more_btn"
                    onClick={() => navigate(`/shop/${x?.route}`)}
                  >
                    View More
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <div className="d-flex justify-content-center align-items-center">
          <Button
            className="view_all_btn d-block d-sm-none"
            onClick={() => navigate("/shop")}
          >
            View all
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default FeaturedCategories;
