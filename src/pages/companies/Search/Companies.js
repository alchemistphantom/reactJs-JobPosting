/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import "./companies.css";
import { Container, Row, Col, Form, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { render } from "@testing-library/react";
import { Link } from "react-router-dom";
let link = "http://localhost:5000/company/";

class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.getDataCompanies();
  }

  getDataCompanies = async () => {
    await axios.get(link).then(result => {
      this.setState({
        data: result.data.data
      });
    });
    console.log(this.state.data[0].name);
  };
  render() {
    const { data } = this.state;
    return (
      <Container fluid className="wrapper">
        <Row className="header">
          <Row className="content-header">
            <Col lg={{ span: 6, offset: 1 }}>
              <Row>
                <h1>Temukan tempat yang bagus untuk bekerja</h1>
                <h4>Temukan jutaan ulasan perusahaan</h4>
              </Row>
              <Row style={{ marginTop: 50 }}>
                <Col style={{ padding: "0px 0px" }} xs={7}>
                  <Form>
                    <Form.Control
                      style={{ padding: "30px 30px" }}
                      size="lg"
                      placeholder="masukan name perusahaan"
                    />
                  </Form>
                </Col>
                <button className="btn-search">Search</button>
              </Row>
            </Col>
          </Row>
        </Row>
        <Container className="companies-content">
          <Row>
            <Card>
              <Card.Header>
                <Row>
                  <FontAwesomeIcon icon={faBuilding} size="2x" />
                  <h3>Perusahaan Populer</h3>
                </Row>
              </Card.Header>
              <Row>
                <Container fluid className="content-footer">
                  <Row>
                    {data.map(item => {
                      return (
                        <Col>
                          <Link to={{ pathname: "/detail/" + item.id }}>
                            <Card style={{ width: "10rem", margin: "10px" }}>
                              <Card.Img
                                variant="top"
                                style={{ width: "70%" }}
                                src={item.logo}
                              />
                              <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>Lihat Detail</Card.Text>
                              </Card.Body>
                            </Card>
                          </Link>
                        </Col>
                      );
                    })}
                  </Row>
                </Container>
              </Row>
            </Card>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default Companies;
