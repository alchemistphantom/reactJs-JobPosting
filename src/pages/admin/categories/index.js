import React, { Component } from "react";
import Navibar from "../Navibar";
import SideBar from "../SideBar";
import { Card, Button, Table, Modal } from "react-bootstrap";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  showModal = () => {
    this.setState({
      show: !this.state.show
    });
  };
  render() {
    return (
      <div className="wrapper">
        <Navibar />
        <SideBar />
        <div className="content-wrapper">
          <Card>
            <Card.Header>Data Categories</Card.Header>
            <Card.Title>
              <Button variant="primary" style={{ margin: "20px 20px" }}>
                <i className="fas fa-plus"></i>
                Tambah Category
              </Button>
            </Card.Title>

            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td colSpan={2}>
                      <Button onClick={this.showModal} variant="danger">
                        <i className="fas fa-trash"></i>
                        Hapus
                      </Button>
                      <Button variant="success">
                        <i className="fas fa-edit"></i>
                        Edit
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
        <Modal show={this.state.show} onClose={this.showModal}>
          <Modal.Header closeButton>
            <Modal.Title>Perhatian</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>yakin menghapus data ini?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.showModal}>
              Batal
            </Button>
            <Button variant="danger" onClick={this.showModal}>
              Ya
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default index;
