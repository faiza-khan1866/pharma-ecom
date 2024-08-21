import React, { lazy, useState, useEffect, memo, useContext } from "react";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer";
import {
  fetchHomeData,
  fetchDealsData,
  createMostPurchasedProductsData,
} from "../http/apiService";
import Loader from "../components/Loader/PagesLoader";
import AOS from "aos";
import "aos/dist/aos.css";
import { GeneralContext } from "../context/GeneralContext";
import FaqSection from "../sections/Faq";

// Lazy-loaded sections/components
const HomeHeader = lazy(() => import("../sections/Home/HomeHeader"));
const FeaturedCategories = lazy(() =>
  import("../sections/Home/FeaturedCategories")
);
const DealOfTheDay = lazy(() => import("../sections/Home/DealOfTheDay"));
const CodeDeal = lazy(() => import("../sections/Home/CodeDeal"));
const FeaturedProducts = lazy(() =>
  import("../sections/Home/FeaturedProducts")
);
const ProductDeal = lazy(() => import("../sections/Home/ProductDeal"));
const OurClients = lazy(() => import("../sections/Home/OurClients"));
const Features = lazy(() => import("../sections/Home/Features"));
const Subscribe = lazy(() => import("../sections/Home/Subscribe"));

const bannerSec = [
  {
    title: "From Prescriptions to Wellness Trust MediExpress for Complete Care",
    sub_title: null,
    background_image: "homebanner1-172197733882.webp",
    bannerBtn_text: "Shop Now!",
    bannerBtn_Link: "shop",
  },
  {
    title:
      "Quality Medicines for a Healthier You! “MediExpress” A Name You Can Trust",
    sub_title: null,
    background_image: "homebanner2-172197733719.webp",
    bannerBtn_text: "Order Today!",
    bannerBtn_Link: "shop",
  },
  {
    title: "Your Go-To for Quality Medicines Feel Better with MediExpress!",
    sub_title: null,
    background_image: "homebanner3-172197733766.webp",
    bannerBtn_text: "Shop Now!",
    bannerBtn_Link: "shop",
  },
];

const faqList = [
  {
    question: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    answer:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus nisi iste autem beatae, enim cum perferendis architecto consectetur! Doloremque rem ut odio ab ipsa. Blanditiis quam perspiciatis cumque doloremque impedit!",
  },
  {
    question: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    answer:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus nisi iste autem beatae, enim cum perferendis architecto consectetur! Doloremque rem ut odio ab ipsa. Blanditiis quam perspiciatis cumque doloremque impedit!",
  },
  {
    question: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    answer:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus nisi iste autem beatae, enim cum perferendis architecto consectetur! Doloremque rem ut odio ab ipsa. Blanditiis quam perspiciatis cumque doloremque impedit!",
  },
  {
    question: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    answer:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus nisi iste autem beatae, enim cum perferendis architecto consectetur! Doloremque rem ut odio ab ipsa. Blanditiis quam perspiciatis cumque doloremque impedit!",
  },
  {
    question: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    answer:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus nisi iste autem beatae, enim cum perferendis architecto consectetur! Doloremque rem ut odio ab ipsa. Blanditiis quam perspiciatis cumque doloremque impedit!",
  },
];

const Home = () => {
  const { countryData } = useContext(GeneralContext);
  const [featuredData, setFeaturedData] = useState([]);
  const [dealsData, setDealsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [homeData, setHomeData] = useState({});
  const [error, setError] = useState("");
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        const { data } = await fetchHomeData();
        setHomeData(data?.content);
      } catch (error) {
        console.error("Error fetching Data:", error);
        setError("Error fetching data");
      }
    };

    fetchHomePageData();
  }, []);

  useEffect(() => {
    {
      if (inView) {
        if (countryData?.ip) {
          const fetchDealsSectionData = async () => {
            try {
              setIsLoading(true); // Show the loader
              const response = await fetchDealsData(countryData?.country_name);
              const data = response.data?.product?.filter(
                (product) => product?.price?.length > 0
              );
              setDealsData(data);
            } catch (error) {
              console.error("Error fetching Data:", error);
            } finally {
              setIsLoading(false); // Hide the loader
            }
          };
          const fetchFeaturedProductListData = async () => {
            let formData = {
              country_id: countryData?.country_name,
            };
            try {
              const response = await createMostPurchasedProductsData(formData);
              if (response?.data?.code) {
                setFeaturedData([]);
              } else {
                setFeaturedData(
                  response?.data?.filter(
                    (product) => product?.price?.length > 0
                  )
                );
              }
            } catch (error) {
              console.error("Error fetching Data:", error);
            }
          };
          fetchDealsSectionData();
          fetchFeaturedProductListData();
        }
      }
    }
  }, [countryData, inView]);

  return (
    <>
      <Helmet>
        <title>Home | MediExpress</title>
        <meta name="description" content="Home" />
      </Helmet>
      <HomeHeader bannerData={isLoading ? bannerSec : homeData?.banerSection} />
      <section ref={ref} style={{ minHeight: "240px" }}>
        {inView ? (
          <>
            <Loader isLoading={isLoading}>
              <FeaturedCategories />
              {dealsData?.length > 0 && (
                <DealOfTheDay productDealsData={dealsData} />
              )}
              <CodeDeal promoCodeData={homeData?.promoCodeSection} />
              {featuredData?.length > 0 && (
                <FeaturedProducts featuredData={featuredData} />
              )}
              <ProductDeal promoDealsData={homeData?.promoBannerSection} />
              <OurClients />
              {error && <div>Error: {error.message}</div>}
            </Loader>
            <Features />
            <FaqSection faqData={faqList} />
            <Subscribe />
          </>
        ) : null}
      </section>
    </>
  );
};

export default memo(Home);
