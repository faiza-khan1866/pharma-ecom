import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import "./TagsAndShareBar.scss";

const TagsAndShareBar = ({ blogData }) => {
  return (
    <div className="tags_share_wrape">
      <div className="tags" data-aos="fade-down" data-aos-once="true">
        <span className="tags_list">{blogData?.tags}</span>
      </div>
      <div className="shareButtons" data-aos="fade-up" data-aos-once="true">
        <span>Share :</span>
        <div className="icons">
          <FacebookShareButton
            url={`https://medi-express.prismcloudhosting.com/blog/${blogData?.route}`}
            quote={blogData?.title}
            hashtag="#MEDIEXPRESS"
          >
            <FacebookIcon size={30} round={true} />
          </FacebookShareButton>
          <TwitterShareButton
            url={`https://medi-express.prismcloudhosting.com/blog/${blogData?.route}`}
            title={blogData?.title}
            hashtags={["MEDIEXPRESS", "Blog"]}
          >
            <TwitterIcon size={30} round={true} />
          </TwitterShareButton>
          <LinkedinShareButton
            url={`https://medi-express.prismcloudhosting.com/blog/${blogData?.route}`}
            title={blogData?.title}
            summary={blogData?.short_description}
          >
            <LinkedinIcon size={30} round={true} />
          </LinkedinShareButton>
          <WhatsappShareButton
            url={`https://medi-express.prismcloudhosting.com/blog/${blogData?.route}`}
            title={blogData?.title}
          >
            <WhatsappIcon size={30} round={true} />
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
};

export default TagsAndShareBar;
