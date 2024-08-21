import React, { useState, useEffect } from "react";
import { fetchClientsData } from "../../../http/apiService";
import DataLoader from "../../../components/Loader/DataLoader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bgImg from "../../../assets/images/home/reviewbg.png";
import { Container } from "react-bootstrap";
import { Rate } from "antd";
import "./OurClients.scss";

var settings = {
  dots: true,
  adaptiveHeight: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  lazyLoad: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const OurClients = () => {
  const [clientsData, setClientsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchClientsReviewData = async () => {
      try {
        setIsLoading(true); // Show the loader

        const response = await fetchClientsData();
        setClientsData(response?.data?.content?.clientReviewSection);
      } catch (error) {
        console.error("Error fetching Data:", error);
      } finally {
        setIsLoading(false); // Hide the loader
      }
    };

    fetchClientsReviewData();
  }, []);
  return (
    <div
      className="clients_wraper mb-60 ptb-60"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {isLoading ? (
        <DataLoader />
      ) : (
        <Container>
          <h2 data-aos="fade-down" data-aos-once="true">
            What Our Client Say
          </h2>
          <Slider {...settings}>
            {clientsData?.map((x, i) => (
              <div key={i} className="container-fluid">
                <div
                  className="detail_wraper"
                  data-aos="fade-up"
                  data-aos-once="true"
                >
                  <p
                    className="review"
                    dangerouslySetInnerHTML={{ __html: x?.review }}
                  />
                  <h3>{x?.author}</h3>
                  <p className="rating">
                    <Rate
                      disabled
                      defaultValue={x?.rating}
                      className="rat_icon"
                    />
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </Container>
      )}
    </div>
  );
};

export default OurClients;
