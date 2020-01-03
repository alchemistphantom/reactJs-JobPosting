import React from "react";
import "./footer.css";
import { Container, Row } from "react-bootstrap";

const Footer = props => {
  return (
    <Container fluid>
      <Row className="footer">
        <a href="#linkku">Browse Jobs</a>
        <a href="#linkku">Companies</a>
        <a href="#linkku">About</a>
        <a href="#linkku">Help Center</a>
      </Row>
    </Container>
  );
};
export default Footer;
