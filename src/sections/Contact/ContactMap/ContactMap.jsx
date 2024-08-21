import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";
import { Col, Row, Container } from "react-bootstrap";
import "./ContactMap.scss";

const ContactMap = () => {
  return (
    <div className="contact_map_wraper mtb-60">
      <Container fluid>
        <Row className="align-items-center">
          <Col md="12" lg="4">
            <div
              className="help_container"
              data-aos="fade-down"
              data-aos-once="true"
            >
              <div className="help_detials">
                <h2 className="title">How can we help you?</h2>
                <p className="detials mt-2">
                  We are at your disposal 7 days a week!
                </p>
                <span className="Line_Break"></span>
                <h4 className="PhoneNumber">(+1800) 56 789 990</h4>
                {/* <p className="ShiftTiming">
                  Monday – Friday:
                  <br /> 9:00-20:00
                  <br /> Saturday: 11:00 – 15:00
                </p> */}
                <span className="Line_Break mt-3"></span>
                <a href="mailto:contact@example.com" className="Email mb-3">
                  <button>contact@example.com</button>
                </a>
                <span className="Line_Break mt-3"></span>
                <div className="social_icons_container">
                  <div className="social_icons">
                    <div>
                      <FaFacebookF />
                    </div>
                    <div>
                      <FaInstagram />
                    </div>
                    <div>
                      <FaYoutube />
                    </div>
                    <div>
                      <FaPinterestP />
                    </div>
                    <div>
                      <FaLinkedinIn />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md="12" lg="8">
            <div
              className="map_container"
              data-aos="fade-up"
              data-aos-once="true"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.5120279847924!2d-74.06442812610777!3d4.680695341832908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9aef4942ac03%3A0x8c5c6cc00046bc33!2sMEDIEXPRESS%20IPS!5e0!3m2!1sen!2s!4v1687866794272!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactMap;
