import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalMessage from "../component/ModalMessage";

const NavigationBar = props => {
  const [Login, setLogin] = useState(props.isLogin || false);
  const [modal, setModal] = useState(false);

  const handleToken = () => {
    console.log("batal");
    setModal(!modal);
  };

  const logout = isLogout => {
    props.logoutParent(isLogout);
    setLogin(false);
    // console.log("Logout", isLogin);
    handleToken();
    localStorage.removeItem("token");
    setLogin(true);
  };

  // const login = () => {
  //   if (props.isLogin !== undefined) {
  //     setLogin(false);
  //   }
  // };

  return (
    <>
      {/* {setToken(localStorage.getItem("token"))} */}
      <Navbar bg="light" fixed variant="light" expand="lg">
        <Navbar.Brand href="#home">
          <Link to="/">El-Deed</Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/">
              <Nav.Link href="#Home">Cari Lowongan Kerja</Nav.Link>
            </Link>
            <Link to="/company">
              <Nav.Link href="#company">Ulasan Perusahaan</Nav.Link>
            </Link>
          </Nav>
          <Nav>
            {!props.isLogin ? (
              <Link to="/login">
                <Nav.Link href="#login" className="bold">
                  Masuk
                </Nav.Link>
              </Link>
            ) : (
              <NavDropdown title="Account" ico id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Account</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  <Link to="/">
                    <Nav.Link
                      href="#logout"
                      onClick={() => {
                        handleToken();
                      }}
                      className="bold"
                    >
                      Logout
                    </Nav.Link>
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Nav.Link className="bold" href="#perusahaan">
              Perusahaan/ Post Lowongan
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <ModalMessage
        message="apakah anda ingin keluar?"
        show={modal}
        btnPositive="keluar"
        cancel={() => {
          handleToken();
        }}
        goLogout={logout}
      />
    </>
  );
};
export default NavigationBar;
