import React from "react";
import useProfile from "../../assets/images/icons/userProfile.png";
import "./SingleCommentArea.scss";

const SingleCommentArea = ({ commentsData }) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <div
      className="single_comment_wrape"
      data-aos="zoom-in"
      data-aos-once="true"
    >
      <h2 className="commentHeading" data-aos="fade-up" data-aos-once="true">
        Comments: {commentsData?.length}
      </h2>
      {commentsData?.map((item) => (
        <div
          className="single_comment mb-3"
          key={item?.id}
          data-aos="fade-up"
          data-aos-once="true"
        >
          <div className="commentProfile">
            <img src={useProfile} className="img-fluid" alt="user_profile" />
          </div>
          <div className="comment_details">
            <h3 className="comment_title">{item?.first_name}</h3>
            <p className="comment_date">
              {new Date(item?.created_at)?.toLocaleDateString("en-US", options)}
            </p>
            <p className="comment_area">{item?.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SingleCommentArea;
