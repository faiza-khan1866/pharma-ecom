import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TagsAndShareBar from "../../../components/TagsAndShareBar/TagsAndShareBar";
import SingleCommentArea from "../../../components/SingleCommentArea/SingleCommentArea";
import CommentArea from "../../../components/CommentArea/CommentArea";
import BlogSideBar from "../../../components/BlogSideBar/BlogSideBar";
import blogmainImage from "../../../assets/images/blog/bloglist1.png";
import "./BlogInner.scss";

const BlogInner = ({ blogDetails }) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <Container>
      <div className="blog_Inner_wrape mb-60">
        <Row>
          <Col sm={3}>
            <BlogSideBar search={false} />
          </Col>
          <Col sm>
            <div
              className="blog_detail_wrape"
              data-aos="zoom-in"
              data-aos-once="true"
            >
              <figure>
                <img
                  src={
                    blogDetails?.featured_img
                      ? process.env.REACT_APP_IMAGE_BASE_URL +
                        blogDetails?.featured_img
                      : blogmainImage
                  }
                  alt="thumbnail"
                />
              </figure>
              <div
                className="blog_details"
                data-aos="fade-up"
                data-aos-once="true"
              >
                <p className="blog_date">
                  Posted On:{" "}
                  <span>
                    {new Date(blogDetails?.created_at)?.toLocaleDateString(
                      "en-US",
                      options
                    )}
                  </span>
                </p>
                <h6 className="blog_title">{blogDetails?.title}</h6>
                <p
                  className="blog_inner_details"
                  dangerouslySetInnerHTML={{ __html: blogDetails?.description }}
                />
                <TagsAndShareBar blogData={blogDetails} />
              </div>
            </div>
            {blogDetails?.comments?.length > 0 && (
              <SingleCommentArea commentsData={blogDetails?.comments} />
            )}
            <CommentArea blogId={blogDetails?.id} />
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default BlogInner;
