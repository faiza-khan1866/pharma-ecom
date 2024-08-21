import React from "react";
import { Container, Accordion } from "react-bootstrap";
import "./FaqSection.scss";

const FaqSection = ({ faqData }) => {
  return (
    <div className="faq-wrape pb-60">
      <Container>
        <h2 className="main-title" data-aos="fade-down" data-aos-once="true">
          Frequently Asked Question
        </h2>
        <Accordion defaultActiveKey={1} flush>
          {faqData?.map((x, i) => (
            <Accordion.Item
              eventKey={i + 1}
              key={i}
              data-aos="fade-up"
              data-aos-once="true"
            >
              <Accordion.Header>{x?.question}</Accordion.Header>
              <Accordion.Body>
                <p dangerouslySetInnerHTML={{ __html: x?.answer }} />
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </div>
  );
};

export default FaqSection;
