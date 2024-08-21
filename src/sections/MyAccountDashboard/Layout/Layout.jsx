import React from "react";
import AccountSideBar from "../AccountSideBar";
import { Container, Row, Col } from "react-bootstrap";
import "./Layout.scss";

const Layout = (props) => {
  return (
    <div className="layout_wrape mb-60">
      <Container>
        <h2 className="main_title" data-aos="fade-down" data-aos-once="true">
          My Account
        </h2>
        <Row>
          <Col sm={12} lg={4}>
            <AccountSideBar />
          </Col>
          <Col sm>
            <div
              className="dashboard_content"
              data-aos="zoom-in"
              data-aos-once="true"
            >
              {props.children}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Layout;
