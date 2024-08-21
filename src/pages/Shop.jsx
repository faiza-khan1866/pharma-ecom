import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation, useParams } from "react-router-dom";
import {
  fetchShopProductData,
  fetchProductData,
  fetchProductCategoryFilterData,
  fetchProductFilterData,
  createProductPriceFilterData,
} from "../http/apiService";
import { GeneralContext } from "../context/GeneralContext";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import ProductCard from "../sections/Products/ProductCard/ProductCard";
import Subscribe from "../sections/Home/Subscribe";
import { breadCrumbs } from "../config/breadCrumbs";

const Shop = () => {
  const { pathname } = useLocation();
  const { cat } = useParams();
  const { countryData } = useContext(GeneralContext);
  const [originalProductData, setOriginalProductData] = useState([]);
  const [rawProducts, setRawProducts] = useState([]);
  const [productData, setProductData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    if (countryData?.ip) {
      setCountry(countryData?.country_name);
      if (pathname === "/shop") {
        const fetchShopProductListData = async () => {
          let formData = {
            country: countryData?.country_name,
          };
          try {
            setIsLoading(true); // Show the loader
            const response = await fetchShopProductData(formData);
            if (response?.data?.code) {
              setProductData([]);
              setOriginalProductData([]);
              setCategoriesData([]);
            } else {
              setProductData(
                response?.data?.product?.filter(
                  (product) => product?.price?.length > 0
                )
              );
              setOriginalProductData(
                response?.data?.product?.filter(
                  (product) => product?.price?.length > 0
                )
              );
              setRawProducts(response?.data?.product);
              setCategoriesData(response?.data?.categories);
            }
          } catch (error) {
            console.error("Error fetching Data:", error);
          } finally {
            setIsLoading(false); // Hide the loader
          }
        };
        fetchShopProductListData();
      } else {
        const fetchProductListData = async () => {
          let formData = {
            category: cat,
            country: countryData?.country_name,
          };
          try {
            setIsLoading(true); // Show the loader
            const response = await fetchProductData(formData);
            if (response?.data?.code) {
              setProductData([]);
              setOriginalProductData([]);
            } else {
              setProductData(
                response?.data?.product?.filter(
                  (product) => product?.price?.length > 0
                )
              );
              setOriginalProductData(
                response?.data?.product?.filter(
                  (product) => product?.price?.length > 0
                )
              );
              setRawProducts(response?.data?.product);
            }
          } catch (error) {
            console.error("Error fetching Data:", error);
          } finally {
            setIsLoading(false); // Hide the loader
          }
        };
        fetchProductListData();
      }
    }
  }, [cat, countryData, pathname]);

  useEffect(() => {
    AOS.init();
  }, []);

  // filter Sale Product
  const filterSaleProduct = (ischeckboxChecked = checkboxChecked) => {
    if (ischeckboxChecked) {
      const saleProducts = originalProductData?.filter((product) => {
        return product?.price?.[0]?.sale_price != 0;
      });
      setProductData(saleProducts);
    } else {
      setProductData(originalProductData);
    }
  };

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
      return ratings >= 3;
    });
  };

  const sortByPriceHighToLow = () => {
    return [...originalProductData].sort((a, b) => {
      // const priceA = parseFloat(a?.price[0]?.actual_price);
      // const priceB = parseFloat(b?.price[0]?.actual_price);

      const getPrice = (product) => {
        const priceData = product?.price?.[0] || {};
        return (
          Number(priceData.sale_price) ||
          Number(priceData.deal_price) ||
          Number(priceData.actual_price) ||
          0
        );
      };

      const priceA = getPrice(a);
      const priceB = getPrice(b);

      return priceB - priceA;
    });
  };

  const sortByPriceLowToHigh = () => {
    return [...originalProductData].sort((a, b) => {
      // const priceA = parseFloat(a?.price[0]?.actual_price);
      // const priceB = parseFloat(b?.price[0]?.actual_price);

      const getPrice = (product) => {
        const priceData = product?.price?.[0] || {};
        return (
          Number(priceData.sale_price) ||
          Number(priceData.deal_price) ||
          Number(priceData.actual_price) ||
          0
        );
      };

      const priceA = getPrice(a);
      const priceB = getPrice(b);

      return priceA - priceB;
    });
  };

  // filter Product by  Category

  const fetchCategoryFilterData = async (categoryRoute) => {
    let formData = {
      category: categoryRoute,
      country: country,
    };

    try {
      setIsLoading(true); // Show the loader
      if (categoryRoute !== null) {
        const { data } = await fetchProductCategoryFilterData(formData);
        if (data?.code) {
          setProductData([]);
        } else {
          setProductData(
            data?.product?.filter((product) => product?.price?.length > 0)
          );
        }
      } else {
        setProductData(originalProductData);
      }
    } catch (error) {
      console.error("Error fetching Data:", error);
    } finally {
      setIsLoading(false); // Hide the loader
    }
  };

  // filter Product by  sub-category and child category

  const fetchSubCategoryChildCategoryFilterData = async (
    itemRoute,
    paramVal
  ) => {
    let formData = {
      [paramVal]: itemRoute,
      country: country,
    };

    try {
      setIsLoading(true); // Show the loader
      if (itemRoute !== null) {
        const { data } = await fetchProductFilterData(formData);
        if (data?.code) {
          setProductData([]);
        } else {
          setProductData(
            data?.product?.filter((product) => product?.price?.length > 0)
          );
        }
      } else {
        setProductData(originalProductData);
      }
    } catch (error) {
      console.error("Error fetching Data:", error);
    } finally {
      setIsLoading(false); // Hide the loader
    }
  };

  // filter Product by  Price

  const fetchPriceFilterData = async (minValue, maxValue) => {
    let formData = {};
    if (pathname === "/shop") {
      formData = {
        category: cat,
        country: country,
        min: Number(minValue),
        max: Number(maxValue),
      };
    } else {
      formData = {
        category: cat,
        country: country,
        min: Number(minValue),
        max: Number(maxValue),
      };
    }

    try {
      setIsLoading(true); // Show the loader
      const { data } = await createProductPriceFilterData(formData);
      //same here ... agar kisi ki prices nahi hai ... wo backend say ana e nai chahiay
      if (data?.code) {
        setProductData([]);
      } else {
        const filteredProducts = data?.product?.filter(
          (product) => product?.price?.length > 0
        );
        setProductData(filteredProducts);
      }
    } catch (error) {
      console.error("Error fetching Data:", error);
    } finally {
      setIsLoading(false); // Hide the loader
    }
  };
  //filter by rating
  const filterByRating = (rating) => {
    let filtered = [];
    if (rating > 0 && rating < 6) {
      filtered = originalProductData?.filter(
        (product) => product?.review === rating
      );
    } else if (rating == null) {
      filtered = originalProductData;
    }
    setProductData(filtered);
  };

  return (
    <>
      <Helmet>
        <title>
          {cat ? cat?.replace(/-/g, " ")?.toUpperCase() : "Shop"} | MediExpress
        </title>
        <meta name="description" content="Shop" />
      </Helmet>
      <BreadCrumbs
        breadCrumbItems={
          cat
            ? breadCrumbs["shopcat"](cat?.replace(/-/g, " "), cat)
            : breadCrumbs["shop"]
        }
      />
      <ProductCard
        items={productData}
        loading={isLoading}
        priceFilterData={fetchPriceFilterData}
        filterSaleProduct={filterSaleProduct}
        setCheckboxChecked={setCheckboxChecked}
        checkboxChecked={checkboxChecked}
        selectedFilter={selectedFilter}
        handleFilterChange={handleFilterChange}
        filterByRating={filterByRating}
        categoriesData={categoriesData}
        categoryFilterData={fetchCategoryFilterData}
        pathname={pathname}
        filterProductData={fetchSubCategoryChildCategoryFilterData}
      />
      <Subscribe />
    </>
  );
};
export default Shop;
