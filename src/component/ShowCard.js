import React, { Component } from "react";
import { Card, Row, Col, Container, Toast } from "react-bootstrap";
import axios from "axios";
import imgClose from "../icons/x.png";
import "../pages/Jobs/ResultJob/Resultjob.css";
import { Link } from "react-router-dom";
const link = "http://localhost:5000/Applyjob/";

class CardShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.idjob,
      data: [],
      isLogin: false,
      showToast: false
    };
  }

  componentDidMount() {
    this.getDatabyId(this.state.show);
  }

  getDatabyId = async id => {
    await axios
      .get(link + id)
      .then(result => {
        this.setState({
          data: result.data.result[0]
        });
      })
      .catch(error => {
        this.setState({
          message: "failed to get data " + error,
          show: true
        });
      });
  };

  handleApply = idJob => {
    console.log("idjob", idJob);
    if (!this.props.isLogin) {
      this.setState({
        isLogin: true
      });
    } else {
      this.applyJob(idJob);
    }
  };

  applyJob = async idJob => {
    await axios({
      method: "post",
      url: link,
      data: { job_id: idJob },
      headers: {
        authorization: "",
        "x-access-token": localStorage.getItem("token")
      }
    })
      .then(response => {
        this.setState({
          showToast: true
        });
        console.log("coba ", response);
      })
      .catch(error => {
        console.log("error ", error);
      });
    console.log("error ");
  };

  handleMessage = () => {
    if (this.state.isLogin) {
      return (
        <div>
          <p>
            anda harus login untuk melanjutkan{" "}
            <Link to="/login">Login disini</Link>
          </p>
        </div>
      );
    }
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        {this.props.hide && (
          <Card>
            <Card
              onClick={() => {}}
              style={{ alignItems: "flex-end", display: "flex", margin: 5 }}
            >
              <img
                onClick={this.props.closeModal}
                src={imgClose}
                height={30}
                width={30}
                alt="close"
              ></img>
            </Card>
            <Card.Body>
              <Container
                style={{
                  display: "fixed",
                  boxShadow: "0px 20px 21px -24px rgba(0,0,0,0.63)"
                }}
              >
                <Row>
                  <Col xs={3} style={{ border: "1px solid black" }}>
                    <img
                      src={this.props.data.logo}
                      height="50px"
                      width="90px"
                      alt="gambar"
                    />
                  </Col>
                  <Col>
                    <Card.Title>{this.props.data.name} </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {this.props.data.company}
                    </Card.Subtitle>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <button
                      className="btn-apply"
                      onClick={() => {
                        this.handleApply(this.props.data.id);
                      }}
                    >
                      Apply Now
                    </button>
                  </Col>
                  {this.handleMessage()}
                </Row>
              </Container>
              <div className="content-description">
                <Card.Text>{this.props.data.location}</Card.Text>
                <Card.Text>Easily apply</Card.Text>
                <Card.Text>Full-time, Contract</Card.Text>
                <Card.Text>
                  <b>Rp. {this.props.data.salary} per bulan</b>
                </Card.Text>
                <Card.Text>Deskripsi:</Card.Text>
                <Card.Text>{this.props.data.description}</Card.Text>
                <Card.Text>BATAS WAKTU APPLY TGL 9 DES 2019</Card.Text>
                <Card.Text>Jenis Pekerjaan: Penuh Waktu, Kontrak</Card.Text>
                <Card.Text>
                  Gaji: Rp2.000.000 hingga Rp2.300.000 /bulan
                </Card.Text>
                <Card.Text> Pengalaman :</Card.Text>
                <ul>
                  <li>Customer service: 1 tahun (Diutamakan) </li>
                </ul>
                <Card.Text> Pending :</Card.Text>
                <ul>
                  <li>S1 (Dibutuhkan) </li>
                </ul>
                <Card.Text> Lokasi :</Card.Text>
                <ul>
                  <li>{this.props.data.location} (Diutamakan) </li>
                </ul>
                <Card.Link href="#">{this.props.data.date_added}</Card.Link>
                <Card.Link href="#">save jobs</Card.Link>
              </div>
            </Card.Body>
            <Toast show={this.state.showToast}>
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded mr-2"
                  alt=""
                />
                <strong className="mr-auto">Bootstrap</strong>
                <small>11 mins ago</small>
              </Toast.Header>
              <Toast.Body>
                Woohoo, you're reading this text in a Toast!
              </Toast.Body>
            </Toast>
          </Card>
        )}
      </div>
    );
  }
}

export default CardShow;
