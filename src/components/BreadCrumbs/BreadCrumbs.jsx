import React from "react";
import { Container } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import "./BreadCrumbs.scss";

const BreadCrumbs = ({ breadCrumbItems }) => {
  return (
    <div className="theme-breadcrumbs">
      <Container>
        <Breadcrumb>
          {breadCrumbItems?.map((item) => (
            <Breadcrumb.Item href={item?.link} active={item?.active}>
              {item?.text}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </Container>
    </div>
  );
};

export default BreadCrumbs;
