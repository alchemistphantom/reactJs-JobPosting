import React from "react";
// import styles from "./styles";
import { Container, Row, Col } from "react-bootstrap";
import img from "../../icons/nofound.png";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={{ offset: 3 }}>
          <Row>
            <img src={img} alt="" />
          </Row>
          <Row>
            <h5>
              Kembali kehalaman utama <Link to="/">disini</Link>
            </h5>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
