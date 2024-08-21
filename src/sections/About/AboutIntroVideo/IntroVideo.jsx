import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import ReactPlayer from "react-player/lazy";
import { MdOutlinePlayCircle, MdOutlinePauseCircle } from "react-icons/md";
import videoBanner from "../../../assets/images/about/aboutVideo.png";
import videoUrl from "../../../assets/images/about/aboutVideoUrl.mp4";
import "./IntroVideo.scss";

const IntroVideo = ({ videoIntro }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className="intro_video_wrape ptb-60">
      <Container>
        <Row className="align-items-center">
          <Col md="12" lg="5">
            <div
              className="video_details"
              data-aos="fade-down"
              data-aos-once="true"
            >
              <h2>{videoIntro?.title}</h2>
              <h4
                dangerouslySetInnerHTML={{ __html: videoIntro?.description }}
              />
              {/* <div className="timing">
                <p className="timing_para">
                  <MdCoronavirus fontSize="24px" /> Up to 5 users simultaneously
                </p>
                <p className="timing_para">
                  <TbCertificate fontSize="24px" /> Has HEALTH certificate
                </p>
              </div>
              <Button className="about_btn">About</Button> */}
            </div>
          </Col>
          <Col md="12" lg="7">
            <div className="video_wrap" data-aos="fade-up" data-aos-once="true">
              <ReactPlayer
                url={videoUrl}
                light={
                  !isPlaying && (
                    <img
                      src={
                        videoIntro?.thumbnail_image
                          ? process.env.REACT_APP_IMAGE_BASE_URL +
                            videoIntro?.thumbnail_image
                          : videoBanner
                      }
                      alt="Thumbnail"
                    />
                  )
                }
                playIcon={<MdOutlinePlayCircle className="play_icon" />}
                playing={isPlaying}
                onEnded={handleVideoEnd}
                width="100%"
                height="100%"
                onClick={handlePlayPause}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default IntroVideo;
