import React, { Component } from "react";
import { Form, Container, Row, Col, Card, Spinner } from "react-bootstrap";
import styles from "./Resultjob.css";
import ShowCard from "../../../component/ShowCard";
import CardJob from "../../../component/CardJob";
import axios from "axios";
let link = "http://localhost:5000/job/";

export default class ResultJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Card: false,
      data: [],
      data2: [],
      message: "",
      show: false,
      id: "",
      activePage: 1,
      per_page: null,
      total: null,
      current_page: null,
      total_page: null,
      isLoading: true,
      job: ""
    };
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  componentDidMount() {
    console.log("ini adalah component didmount");
    this.getJobData("", "", this.props.words.words);
  }

  getJobData = async (page, sortBy, words) => {
    page = page || 1;
    sortBy = sortBy || "date_added";
    await axios
      .get(link + `?sortBy=${sortBy}&page=${page}&words=${words}`)
      .then(result => {
        this.setState({
          data: result.data.dataResult.data,
          current_page: result.data.dataResult.info.page,
          total_page: result.data.dataResult.info.page_count,
          per_page: result.data.dataResult.info.limit,
          activePage: page,
          isLoading: false
        });
        console.log(this.state.total);
      })
      .catch(error => {
        this.setState({
          message: "failed to get data " + error,
          show: true
        });
      });
    console.log(this.state.message);
  };
  toggleCard = () => {
    this.setState({
      Card: true
    });
  };
  closeCard = () => {
    this.setState({
      Card: false
    });
  };
  setId = idjob => {
    this.setState({
      id: idjob
    });
    // console.log(idjob);
  };
  getDatabyId = async id => {
    await axios
      .get(link + id)
      .then(result => {
        this.setState({
          data2: result.data.result[0]
        });
      })
      .catch(error => {
        this.setState({
          message: "failed to get data " + error,
          show: true
        });
      });
  };

  handleForm = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(
      {
        [name]: value
      },
      () => {
        console.log(this.state.job);
      }
    );
  };

  dataNotFound = () => {
    this.setState({
      isLoading: false
    });
    return <Card variant="primary">{this.props.word} tidak di temukan!</Card>;
  };

  render() {
    const { current_page, total_page, isLoading, total } = this.state;
    let pageNumber = [];
    for (let i = 1; i <= total_page; i++) {
      pageNumber.push(i);
    }

    const renderPageNumber = pageNumber.map(number => {
      let classes = parseInt(current_page) === number ? "active" : "";
      if (
        number === 1 ||
        number === this.state.total ||
        (number >= this.state.current_page - 2 &&
          number <= this.state.current_page + 2)
      ) {
        return (
          <span
            className={classes}
            onClick={() => this.getJobData(number, "", "")}
            key={number}
          >
            {number}
          </span>
        );
      }
    });

    return (
      <>
        <div className="wrapper">
          <Container fluid>
            <Row className="header-wrapper">
              <Col>
                <div className="search-content">
                  <Container>
                    <Row>
                      <Col xs={5}>
                        <h5>Pekerjaan</h5>

                        <Form.Control
                          onChange={event => {
                            this.handleForm(event);
                          }}
                          placeholder={this.props.words.words}
                          name="job"
                          size="sm"
                          className="form-input"
                          type="email"
                        />
                      </Col>
                      <Col xs={6}>
                        <h5>Perusahaan</h5>

                        <Row>
                          <Col>
                            <Form.Control
                              size="sm"
                              className="form-input"
                              type="email"
                            />
                          </Col>
                          <button
                            onClick={() => {
                              this.getJobData("", "", this.state.job);
                            }}
                            size="sm"
                            className="btn-search"
                          >
                            Cari Lowongan
                          </button>
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Col>
            </Row>
            <Row className="content-wrapper">
              <Col xs={2}>
                <Card>React in Bogor</Card>
                <Card>
                  <Container fluid>
                    <Row>
                      <p>Sort by : </p>
                    </Row>
                    <Row className="link-sortby">
                      <span>
                        <a
                          onClick={() => {
                            this.getJobData(current_page, "name", "");
                          }}
                          href="#name"
                        >
                          nama
                        </a>
                      </span>

                      <a
                        href="#date"
                        onClick={() => {
                          this.getJobData(current_page, "date_added", "");
                        }}
                      >
                        date
                      </a>
                      <a
                        href="#Company"
                        onClick={() => {
                          this.getJobData(current_page, "company", "");
                        }}
                      >
                        company
                      </a>
                    </Row>
                  </Container>
                </Card>
              </Col>
              <Col xs={5}>
                <Card>
                  <p>
                    <b>
                      <a href="#link">Post your CV - </a>
                    </b>
                    and easily apply to job from any device!
                  </p>
                </Card>
                {total === null ? this.dataNotFound : ""}
                {isLoading ? (
                  <div className="auto">
                    <Spinner variant="dark" animation="border" />
                  </div>
                ) : (
                  <Card>
                    <Card>
                      <p className="page-text">
                        page {current_page} of {total_page}
                      </p>
                    </Card>
                    {this.state.data.map(item => {
                      let classes =
                        this.state.id === item.id ? "1px solid blue" : "";
                      return (
                        <CardJob
                          showCard={this.toggleCard}
                          styles={
                            this.state.id === item.id ? "1px solid blue" : ""
                          }
                          getIdjob={() => this.getDatabyId(item.id)}
                          key={item.id}
                          data={item}
                        ></CardJob>
                      );
                    })}
                    <Row>
                      <div className="pagination">
                        <span>&laquo;</span>
                        {renderPageNumber}
                        <span>&raquo;</span>
                      </div>
                    </Row>
                  </Card>
                )}
              </Col>
              <Col xs={5}>
                <div className="content-fixed">
                  <Card>
                    <ShowCard
                      hide={this.state.Card}
                      data={this.state.data2}
                      closeModal={this.closeCard}
                      isLogin={this.props.isLogin}
                    />
                  </Card>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
