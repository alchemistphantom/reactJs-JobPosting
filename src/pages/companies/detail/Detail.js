import React, { Component } from "react";
import style from "./styles.js";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
let link = "http://localhost:5000/company/";
// const id = this.props.match.params;

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    // console.log("ini adlah id" + id);
    this.getDetailCompany(this.props.match.params.id);
  }

  getDetailCompany = async id => {
    console.log(link + id);
    axios.get(link + id).then(result => {
      console.log(result.data.result[0]);
      this.setState({
        data: result.data.result[0]
      });
    });
  };
  render() {
    const { data } = this.state;
    return (
      <Container fluid style={style.container}>
        <Row style={style.searchContent}>
          <Col lg={{ span: 5, offset: 3 }}>
            <Form>
              <Form.Control
                style={style.control}
                placeholder="Nama Perusahaan"
              ></Form.Control>
            </Form>
          </Col>
          <Button style={style.button}>Cari Perusahaan</Button>
        </Row>
        <Row style={style.header}>
          <Col lg={{ offset: 2 }}>
            <Row>
              <Image src={data.logo} rounded {...style.headerImg}></Image>
              <Col>
                <h3>{data.name}</h3>

                <Row style={style.starWrapper}>
                  <h5>4.5</h5>
                  <FontAwesomeIcon
                    size="2x"
                    style={style.starIcon}
                    icon={faStar}
                  />
                  <FontAwesomeIcon
                    size="2x"
                    style={style.starIcon}
                    icon={faStar}
                  />
                  <FontAwesomeIcon
                    size="2x"
                    style={style.starIcon}
                    icon={faStar}
                  />
                  <FontAwesomeIcon
                    size="2x"
                    style={style.starIcon}
                    icon={faStar}
                  />
                  <FontAwesomeIcon
                    size="2x"
                    style={style.starIcon}
                    icon={faStarHalfAlt}
                  />
                </Row>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col bottom>
                <Button style={style.btnFollow}>Ikuti</Button>
                <p style={style.p}>Get weekly updates, new jobsm and reviews</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={style.description}>
          <Col style={style.descTitle} lg={{ offset: 2 }}>
            <h4>{data.name} Careers and Employment</h4>
          </Col>

          <Row>
            <Col lg={{ span: 4, offset: 2 }}>
              <Row>
                <Col>
                  <b>About us</b>
                  <p>{data.description} – less</p>
                </Col>
              </Row>
            </Col>
            <Col lg={{ span: 2 }}>
              <Row>
                <b>Headquarters</b>
                <p>{data.location}</p>
              </Row>
              <Row>
                <b>Industry </b>
                <br />
                <p>
                  <a href="#Category">Internet and Software</a>
                </p>
              </Row>
            </Col>
            <Col>
              <Row>
                <b>Employees </b>
                <br />
                <p>501 to 1,000</p>
              </Row>
              <Row>
                <b>Website </b>
                <br />
                <p>Twitter Facebook ...more</p>
              </Row>
            </Col>
          </Row>
        </Row>
        <Row></Row>
      </Container>
    );
  }
}

export default Detail;
