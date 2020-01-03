import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./home.css";
import { Link } from "react-router-dom";

class SearchJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: {
        words: "",
        company: ""
      }
    };
  }

  handleFormSearch = event => {
    event.preventDefault();
    let newQuery = { ...this.state.query };

    const name = event.target.name;
    const value = event.target.value;
    newQuery[name] = value;
    this.setState({
      query: newQuery
    });
  };

  handleSubmit = () => {
    console.log(this.state.words);
    this.props.searchJob(this.state.query);
  };
  render() {
    return (
      <div>
        <Row className="wrapper">
          <Col className="content-group">
            <Row className="content-top">
              <div className="form-action">
                <Col xs={5}>
                  <h5>Pekerjaan</h5>
                  <p>nama pekerjaan</p>
                  <Form.Control
                    onChange={event => {
                      this.handleFormSearch(event);
                    }}
                    name="words"
                    className="form-input"
                    type="email"
                  />
                </Col>
                <Col xs={6}>
                  <h5>Perusahan</h5>
                  <p>Nama Perusahaan</p>
                  <Row>
                    <Col>
                      <Form.Control
                        onChange={event => {
                          this.handleFormSearch(event);
                        }}
                        className="form-input"
                        type="email"
                        name="company"
                      />
                    </Col>
                    <Link to="/result">
                      <Button
                        onClick={() => {
                          this.handleSubmit();
                        }}
                        className="btn-search"
                      >
                        Cari Lowongan
                      </Button>
                    </Link>
                  </Row>
                </Col>
              </div>
            </Row>
            <div className="text-bottom">
              <Row>
                <div>
                  <b>
                    <Link to="/">Pasang CV kamu</Link>
                  </b>
                  -Hanya butuh beberapa detik saja
                </div>
              </Row>
              <Row>
                <div>
                  <Link to="/">Untuk Perusahaan: Pasang Lowongan Kerja</Link> –
                  Cari karyawan baru Anda di sini
                </div>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-popular" lg={{ span: 6, offset: 3 }}>
            <Row>
              <h4>Pencarian Populer</h4>
            </Row>
            <Row className="category">
              <button className="btn-category">Marketing</button>
              <button className="btn-category">Waiter</button>
              <button className="btn-category">Bank</button>
              <button className="btn-category">SuperVisor</button>
              <button className="btn-category">Manager</button>
              <button className="btn-category">Telemarketing</button>
              <button className="btn-category">Quality Control</button>
              <button className="btn-category">Driver</button>
              <button className="btn-category">IT and Technology</button>
              <button className="btn-category">Engineer</button>
              <button className="btn-category">Fresh graduate</button>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SearchJob;
