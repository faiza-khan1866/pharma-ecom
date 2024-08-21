import React, { useState, useEffect, useContext, useRef } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { useParams } from "react-router-dom";
import { fetchProductDetailData } from "../http/apiService";
import { GeneralContext } from "../context/GeneralContext";
import Loader from "../components/Loader/PagesLoader";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import ProductDetail from "../sections/ProductInner/ProductDetail";
import ProductInfoTabs from "../sections/ProductInner/ProductInfoTabs";
import RelatedProducts from "../sections/ProductInner/RelatedProducts";
import Subscribe from "../sections/Home/Subscribe";
import { breadCrumbs } from "../config/breadCrumbs";

const ProductInner = () => {
  const scrollRef = useRef(null);
  const { countryData } = useContext(GeneralContext);
  const { id } = useParams();
  const [singleProductData, setSingleProductData] = useState({});
  const [relatedProductData, setRelatedProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (countryData?.ip) {
      const fetchSingleProductData = async () => {
        let formData = {
          route: id,
          country: countryData?.country_name,
        };
        try {
          setIsLoading(true);

          const { data } = await fetchProductDetailData(formData);
          setSingleProductData(data);
          setRelatedProductData(
            data?.related_product?.filter((x) => x?.route !== id)
          );
        } catch (error) {
          console.error("Error fetching Data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchSingleProductData();
    }
  }, [id, countryData]);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Loader isLoading={isLoading}>
      <Helmet>
        <title>
          {`${singleProductData?.name ? singleProductData?.name : "Product"}`} |
          MediExpress
        </title>
        <meta name="description" content="Product" />
      </Helmet>
      <BreadCrumbs
        breadCrumbItems={breadCrumbs["product"](
          singleProductData?.category?.[0]?.name,
          singleProductData?.category?.[0]?.route,
          singleProductData?.name,
          id
        )}
      />
      <ProductDetail productData={singleProductData} scrollRef={scrollRef} />
      <ProductInfoTabs productData={singleProductData} scrollRef={scrollRef} />
      {relatedProductData?.length > 0 && (
        <RelatedProducts relatedProducts={relatedProductData} />
      )}
      <Subscribe />
    </Loader>
  );
};
export default ProductInner;
