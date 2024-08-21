import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { useParams } from "react-router-dom";
import { fetchBlogDeatilsData } from "../http/apiService";
import Loader from "../components/Loader/PagesLoader";
import { breadCrumbs } from "../config/breadCrumbs";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import BlogInner from "../sections/Blog/BlogInner/BlogInner";
import Subscribe from "../sections/Home/Subscribe";

const BlogInnerPage = () => {
  const { id } = useParams();
  const [blogDetailData, setBlogDetailData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchBlogsDetailData = async () => {
      try {
        setIsLoading(true); // Show the loader

        const response = await fetchBlogDeatilsData(id);
        setBlogDetailData(response?.data);
      } catch (error) {
        console.error("Error fetching Data:", error);
      } finally {
        setIsLoading(false); // Hide the loader
      }
    };

    fetchBlogsDetailData();
  }, [id]);

  return (
    <Loader isLoading={isLoading}>
      <Helmet>
        <title>
          {`${blogDetailData?.title ? blogDetailData?.title : "Blog"}`} |
          MediExpress
        </title>
        <meta name="description" content="Blog" />
      </Helmet>
      <BreadCrumbs
        breadCrumbItems={breadCrumbs["blogInner"](
          blogDetailData?.title,
          blogDetailData?.route
        )}
      />
      <BlogInner blogDetails={blogDetailData} />
      <Subscribe />
    </Loader>
  );
};

export default BlogInnerPage;
