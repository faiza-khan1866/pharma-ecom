import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "./../../assets/images/logo/logo.png";
import {
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaFacebookF,
  FaPinterestP,
} from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import FooterBottom from "../FooterBottom/FooterBottom";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer-wraper">
      <Container>
        <div className="footer-detail mtb-60">
          <div className="row">
            <div className="col-12 col-lg-7">
              <div className="row footer_information">
                <div className="col-12 col-lg-4 col-md-4 col-sm-12 ">
                  {/********** footer Address Section Start *****************/}
                  <div className="footer_address">
                    <Link to="/" className="footer_logo">
                      <img src={logo} alt="logo" />
                    </Link>
                    {/* <p>
                      1487 Rocky Horse Carrefour
                      <br />
                      Arlington, TX 16819
                    </p> */}
                    <p>
                      <a href="/" target="_blank">
                        Show on map
                      </a>
                    </p>
                    <ul className="social_icons">
                      <li>
                        <a className="social__link " href="#">
                          <FaFacebookF />
                        </a>
                      </li>
                      <li>
                        <a className="social__link " href="#">
                          <FaInstagram />
                        </a>
                      </li>
                      <li>
                        <a className="social__link " href="#">
                          <FaYoutube />
                        </a>
                      </li>
                      <li>
                        <a className="social__link " href="#">
                          <FaPinterestP />
                        </a>
                      </li>
                      <li>
                        <a className="social__link " href="#">
                          <FaLinkedinIn />
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/********** footer Address Section End *****************/}
                </div>
                <div className="col-12 col-lg-8 col-md-8 col-sm-12">
                  {/********** footer Contact Section End *****************/}

                  <div className="footer_contact">
                    <h5 className="footer_title">Need help</h5>
                    <div className="footer_fax">
                      <FiPhone className="phoneIcon" />
                      (+1800) 56 789 990
                    </div>
                    {/* <p className="footer_work">
                      Monday – Friday: 9:00-20:00
                      <br />
                      Saturday: 11:00 – 15:00
                    </p> */}
                    <hr />
                    <p>
                      <a
                        className="footer_email"
                        href="mailto:contact@example.com"
                      >
                        <MdOutlineMailOutline className="emailIcon" />
                        contact@example.com
                      </a>
                    </p>
                  </div>
                  {/********** footer Contact Section End *****************/}
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-5">
              <div className="row">
                <div className="col-6">
                  <div className="footer_links_block">
                    <h5 className="block_title">Information</h5>
                    <ul className="block_list">
                      <li>
                        <Link to="/about">About us</Link>
                      </li>
                      <li>
                        <Link to="/delivery-information">
                          Delivery Information
                        </Link>
                      </li>
                      <li>
                        <Link to="/privacy-policy">Privacy Policy</Link>
                      </li>
                      <li>
                        <Link to="/sales">Sales</Link>
                      </li>
                      <li>
                        <Link to="/terms-condition">Terms & Conditions</Link>
                      </li>
                      <li>
                        <Link to="/faq">FAQ's</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-6">
                  <div className="footer_links_block">
                    <h5 className="block_title">Account</h5>
                    <ul className="block_list">
                      <li>
                        <Link to="/account">My account</Link>
                      </li>
                      <li>
                        <Link to="/account/orders">My orders</Link>
                      </li>
                      <li>
                        <Link to="/wishlist">Wishlist</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterBottom />
      </Container>
    </footer>
  );
};

export default Footer;
