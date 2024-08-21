import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchPromotionsData } from "../http/apiService";
import { GeneralContext } from "../context/GeneralContext";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import PromotionsCard from "../sections/Products/PromotionsCard/PromotionsCard";
import Subscribe from "../sections/Home/Subscribe";
import { breadCrumbs } from "../config/breadCrumbs";

const Promotions = () => {
  const { countryData } = useContext(GeneralContext);
  const [originalProductData, setOriginalProductData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    if (countryData?.ip) {
      setCountry(countryData?.country_name);
      const fetchProductListData = async () => {
        let formData = {
          name: countryData?.country_name,
        };
        try {
          setIsLoading(true); // Show the loader
          const response = await fetchPromotionsData(formData);
          if (response?.data?.code) {
            setProductData([]);
            setOriginalProductData([]);
          } else {
            setProductData(
              response?.data?.filter((product) => product?.price?.length > 0)
            );
            setOriginalProductData(
              response?.data?.filter((product) => product?.price?.length > 0)
            );
          }
        } catch (error) {
          console.error("Error fetching Data:", error);
        } finally {
          setIsLoading(false); // Hide the loader
        }
      };
      fetchProductListData();
    }
  }, [countryData]);

  useEffect(() => {
    AOS.init();
  }, []);

  // sort by filter
  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    const selectedValue = e.target.value;

    const filterOptions = {
      All: () => originalProductData,
      Latest: filterByLatest,
      "Average Rating": filterByAverageRating,
      "Price: High - Low": sortByPriceHighToLow,
      "Price: Low - High": sortByPriceLowToHigh,
    };

    const filteredProductsData = filterOptions[selectedValue]();
    setProductData(filteredProductsData);
  };

  const filterByLatest = () => {
    return [...originalProductData].sort((a, b) => {
      const dateA = new Date(a?.price[0]?.created_at);
      const dateB = new Date(b?.price[0]?.created_at);

      return dateB - dateA;
    });
  };

  const filterByAverageRating = () => {
    return originalProductData?.filter((product) => {
      const ratings = product.review;
      // const averageRating =
      //   ratings?.reduce((sum, rating) => sum + rating, 0) / ratings.length;
      return ratings >= 4;
    });
  };

  const sortByPriceHighToLow = () => {
    return [...originalProductData].sort((a, b) => {
      const priceA = parseFloat(a?.price[0]?.actual_price);
      const priceB = parseFloat(b?.price[0]?.actual_price);

      return priceB - priceA;
    });
  };

  const sortByPriceLowToHigh = () => {
    return [...originalProductData].sort((a, b) => {
      const priceA = parseFloat(a?.price[0]?.actual_price);
      const priceB = parseFloat(b?.price[0]?.actual_price);

      return priceA - priceB;
    });
  };

  return (
    <>
      <Helmet>
        <title>Promotions | MediExpress</title>
        <meta name="description" content="Shop" />
      </Helmet>
      <BreadCrumbs breadCrumbItems={breadCrumbs["promotions"]} />
      <PromotionsCard
        items={productData}
        loading={isLoading}
        selectedFilter={selectedFilter}
        handleFilterChange={handleFilterChange}
      />
      <Subscribe />
    </>
  );
};
export default Promotions;
