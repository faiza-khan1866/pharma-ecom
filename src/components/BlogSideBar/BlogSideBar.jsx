import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import { fetchRecentBlogData } from "../../http/apiService";
import blog1 from "../../assets/images/blog/blog1.png";
import "./BlogSideBar.scss";

const BlogSideBar = ({ search, searchBarFilter }) => {
  const navigate = useNavigate();

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // recent blogs Data

  const [recentBlogData, setRecentBlogData] = useState([]);

  useEffect(() => {
    const fetchRecentBlogsData = async () => {
      try {
        const response = await fetchRecentBlogData();
        setRecentBlogData(response?.data);
      } catch (error) {
        console.error("Error fetching Data:", error);
      }
    };

    fetchRecentBlogsData();
  }, []);

  // serach bar code

  const [searchTerm, setSearchTerm] = useState("");

  const isFirstRun = React.useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      searchBarFilter(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, searchBarFilter]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="Blog_side_bar">
      {search && (
        <div className="search-wrape" data-aos="fade-down" data-aos-once="true">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <InputGroup.Text>
              <IoIosSearch fontSize="20px" />
            </InputGroup.Text>
          </InputGroup>
        </div>
      )}
      {recentBlogData?.length !== 0 && (
        <div
          className="recent_blog_wrape"
          data-aos="fade-up"
          data-aos-once="true"
        >
          <h3>Latest Posts</h3>
          {recentBlogData?.slice(0, 5)?.map((item, i) => (
            <div
              className="recent_blog"
              key={item?.id}
              data-aos="fade-down"
              data-aos-once="true"
            >
              <div>
                <figure>
                  <img
                    src={
                      item?.featured_img
                        ? process.env.REACT_APP_IMAGE_BASE_URL +
                          item?.featured_img
                        : blog1
                    }
                    alt="blog_thumnail"
                  />
                </figure>
              </div>
              <div className="blog_detail">
                <p className="blog_detail_title">
                  {new Date(item?.created_at)?.toLocaleDateString(
                    "en-US",
                    options
                  )}
                </p>
                <span
                  className="blog_detail_subTitle"
                  onClick={() => navigate(`/blog/${item?.route}`)}
                >
                  {item?.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogSideBar;
