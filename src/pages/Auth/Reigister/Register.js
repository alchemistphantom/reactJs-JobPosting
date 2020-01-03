import React, { Component } from "react";
import styles from "../Login/styles";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
let baselink = "http://localhost:5000/user/";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataRegister: {
        username: "",
        email: "",
        password: ""
      },
      message: ""
    };
  }

  handleRegisForm = event => {
    let newdataRegister = { ...this.state.dataRegister };
    newdataRegister[event.target.name] = event.target.value;
    this.setState(
      {
        dataRegister: newdataRegister
      },
      () => console.log(this.state.dataRegister)
    );
  };

  onSubmitRegis = async () => {
    await Axios.post(baselink, this.state.dataRegister)
      .then(response => {
        this.setState({
          message: response.data.message
        });
        if (response.data.status === 200) this.props.history.push("/login");
        console.log(this.state.message);
      })
      .catch(err => {
        console.log("error", err);
      });
  };

  errorMessage = () => {
    return <p style={styles.p}>{this.state.message}</p>;
  };

  render() {
    return (
      <Container fluid style={styles.container}>
        <Row></Row>
        <Row style={styles.loginWrapper}>
          <Col md={{ offset: 3, span: 5 }}>
            <Card>
              <Card.Header>
                <Card.Title>Buat akun baru, Gratis!</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>
                      <b>Username</b>
                    </Form.Label>
                    <Form.Control
                      name="username"
                      style={styles.form}
                      size="lg"
                      onChange={this.handleRegisForm}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      <b>Email Address</b>
                    </Form.Label>
                    <Form.Control
                      name="email"
                      style={styles.form}
                      onChange={this.handleRegisForm}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      <b>Password</b>
                    </Form.Label>
                    <Form.Control
                      name="password"
                      onChange={this.handleRegisForm}
                      style={styles.form}
                    ></Form.Control>
                  </Form.Group>
                  {this.errorMessage()}
                  <Button onClick={this.onSubmitRegis} style={styles.btnSign}>
                    Buat Akun
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            <Card>
              <Card.Footer>
                Sudah punya akun? <Link to="/login">Login disini</Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row></Row>
      </Container>
    );
  }
}
export default Login;
