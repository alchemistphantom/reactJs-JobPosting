import React, { Component } from "react";
import styles from "./styles";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
let link = "http://localhost:5000/User/login";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      message: "",
      formLogin: {
        email: "",
        password: ""
      }
    };
  }

  handleLoginForm = event => {
    let formLoginNew = { ...this.state.formLogin };
    formLoginNew[event.target.name] = event.target.value;
    this.setState({
      formLogin: formLoginNew
    });
  };

  handlerSubmit = async () => {
    if (
      this.state.formLogin.email === "" ||
      this.state.formLogin.password === ""
    ) {
      this.setState({
        message: "isi semua kolom"
      });
      return;
    }
    await axios
      .post(link, {
        email: this.state.formLogin.email,
        password: this.state.formLogin.password
      })
      .then(response => {
        if (response.data.token !== undefined) {
          localStorage.setItem("token", response.data.token);
          this.setState({
            isLogin: true
          });
          this.props.parentLogin(this.state.isLogin);
        } else {
          this.setState({
            message: response.data
          });
        }
      })
      .catch(error => {
        console.log("error ", error);
      });
  };

  hadleMessage = () => {
    return <p style={styles.p}>{this.state.message}</p>;
  };

  gotoHome = () => {
    return <Redirect to="/" />;
  };

  render() {
    const { isLogin } = this.state;
    return (
      <Container fluid style={styles.container}>
        {isLogin ? this.gotoHome() : ""}
        <Row></Row>
        <Row style={styles.loginWrapper}>
          <Col md={{ offset: 3, span: 5 }}>
            <Card>
              <Card.Header>
                <Card.Title>Sign In</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>
                      <b>Email Address</b>
                    </Form.Label>
                    <Form.Control
                      name="email"
                      onChange={event => {
                        this.handleLoginForm(event);
                      }}
                      style={styles.form}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      <b>Password</b>
                    </Form.Label>
                    <span>
                      <Form.Control
                        type="password"
                        name="password"
                        onChange={event => {
                          this.handleLoginForm(event);
                        }}
                        style={styles.form}
                      ></Form.Control>
                    </span>
                  </Form.Group>
                </Form>
                {this.hadleMessage()}
              </Card.Body>
              <Button
                style={styles.btnSign}
                onClick={() => {
                  this.handlerSubmit();
                }}
              >
                Sign in
              </Button>
            </Card>
            <Card>
              <Card.Footer>
                Belum punya akun?
                <Link to="/register"> Buat Akun Gratis</Link>
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
