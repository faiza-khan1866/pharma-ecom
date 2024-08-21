import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { TfiAngleDoubleRight, TfiAngleDoubleLeft } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import BlogSideBar from "../../../components/BlogSideBar/BlogSideBar";
import blog1 from "../../../assets/images/blog/bloglist1.png";
import DataLoader from "../../../components/Loader/DataLoader";
import "./BlogMain.scss";

const BlogMain = ({ items, isLoading, searchBarFilterData }) => {
  const navigate = useNavigate();

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // pagination code start

  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 4;
  const pagesVisited = pageNumber * usersPerPage;

  const displayItems = items
    ?.slice(pagesVisited, pagesVisited + usersPerPage)
    ?.map((item, i) => {
      return (
        <div key={i}>
          <div
            className="card Blog_card"
            data-aos="zoom-in"
            data-aos-once="true"
          >
            <figure>
              <img
                src={
                  item?.featured_img
                    ? process.env.REACT_APP_IMAGE_BASE_URL + item?.featured_img
                    : blog1
                }
                alt="thumbnail"
              />
            </figure>
            <div className="blog_details">
              <p className="date">
                Posted on:{" "}
                <span>
                  {new Date(item?.created_at)?.toLocaleDateString(
                    "en-US",
                    options
                  )}
                </span>
              </p>
              <h4 className="heading">{item?.title}</h4>
              <p
                className="deitals"
                dangerouslySetInnerHTML={{ __html: item?.short_description }}
              />
              <Button
                className="read_more_btn"
                onClick={() => navigate(`/blog/${item?.route}`)}
              >
                Read More
              </Button>
            </div>
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(items?.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // pagination code end

  return (
    <Container>
      <div className="blog_wrape mb-60">
        <Row>
          {items?.length !== 0 && (
            <Col sm={3}>
              <BlogSideBar
                search={true}
                searchBarFilter={searchBarFilterData}
              />
            </Col>
          )}
          <Col sm>
            {isLoading ? (
              <DataLoader />
            ) : (
              <>
                {items?.length === 0 ? (
                  <p
                    className="text-center text-secondary mt-5"
                    style={{ fontSize: "18px" }}
                  >
                    No Blog Found !!!
                  </p>
                ) : (
                  <>
                    {displayItems}
                    <div
                      className="pagination-wrap"
                      data-aos="fade-up"
                      data-aos-once="true"
                    >
                      <ReactPaginate
                        previousLabel={<TfiAngleDoubleLeft fontSize="16px" />}
                        nextLabel={<TfiAngleDoubleRight fontSize="16px" />}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default BlogMain;
