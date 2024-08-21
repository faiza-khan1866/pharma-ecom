import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchBlogData, createBlogSearchData } from "../http/apiService";
import { breadCrumbs } from "../config/breadCrumbs";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import BlogMain from "../sections/Blog/BlogLists/BlogMain";
import Subscribe from "../sections/Home/Subscribe";

const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchBlogListData = async () => {
      try {
        setIsLoading(true); // Show the loader

        const response = await fetchBlogData();
        setBlogData(response?.data);
      } catch (error) {
        console.error("Error fetching Data:", error);
      } finally {
        setIsLoading(false); // Hide the loader
      }
    };

    let isMounted = true; // Add a flag to check if component is mounted

    fetchBlogListData().then(() => {
      if (isMounted) {
        setIsLoading(false); // Hide the loader
      }
    });

    return () => {
      isMounted = false; // Cleanup: set isMounted to false when unmounting
    };
  }, []);

  // filter search bar

  const fetchSearchFormData = useCallback(async (searchTerm) => {
    let formData = {
      keyword: searchTerm,
    };
    try {
      setIsLoading(true); // Show the loader
      const response = await createBlogSearchData(formData);
      setBlogData(response?.data);
    } catch (error) {
      console.error("Error fetching Data:", error);
    } finally {
      setIsLoading(false); // Hide the loader
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog | MediExpress</title>
        <meta name="description" content="Blog" />
      </Helmet>
      <BreadCrumbs breadCrumbItems={breadCrumbs["blog"]} />
      <BlogMain
        items={blogData}
        isLoading={isLoading}
        searchBarFilterData={fetchSearchFormData}
      />
      <Subscribe />
    </>
  );
};

export default Blog;
