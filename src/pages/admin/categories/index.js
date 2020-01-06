import React, { Component } from "react";
import Navibar from "../Navibar";
import SideBar from "../SideBar";
import { Card, Button, Table, Modal, Toast } from "react-bootstrap";
import axios from "axios";

const baseLink = "http://localhost:5000/category/";
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      add: false,
      toast: false,
      categories: [],
      message: "",
      name: "",
      id: "",
      isUpdate: false
    };
  }

  showModal = () => {
    this.setState({
      show: !this.state.show
    });
  };

  showModalAdd = () => {
    this.setState({
      add: !this.state.add
    });
  };
  showToast = () => {
    this.setState({
      toast: !this.state.toast
    });
  };

  getCategories = async () => {
    await axios.get(baseLink).then(res => {
      this.setState({
        categories: res.data.data
      });
    });
  };

  addCategory = () => {
    if (this.state.isUpdate) {
      this.updateCategory(this.state.id);
    }
    axios
      .post(baseLink, { name: this.state.name })
      .then(res => {
        this.getCategories();
      })
      .catch(err => {
        console.log(err);
      });
  };

  delCategory = async id => {
    await axios.delete(baseLink + id).then(res => {
      this.setState({
        message: res.data.message
      });
      this.getCategories();
      this.showToast();
      console.log(res);
    });
  };

  updateCategory = async id => {
    await axios
      .patch(baseLink + id, { name: this.state.name })
      .then(res => {
        this.setState({
          message: res.data.message
        });
        this.showToast();
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleUpdate = (name, id) => {
    this.setState({
      name: name,
      id: id,
      isUpdate: true
    });
  };
  handleForm = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  showMessage = () => {
    return (
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "relative",
          minHeight: "100px"
        }}
      >
        <Toast
          onClose={this.showToast}
          show={this.state.toast}
          delay={3000}
          autohide
          style={{
            position: "absolute",
            top: 0,
            right: 0
          }}
        >
          <Toast.Header>Pesan</Toast.Header>
          <Toast.Body style={{ color: "green", fontSize: 15 }}>
            {this.state.message}

            <i
              className="fas fa-accept"
              style={{ marginLeft: 10, height: 25, width: 25 }}
              color=""
            />
          </Toast.Body>
        </Toast>
      </div>
    );
  };
  componentDidMount() {
    this.getCategories();
  }

  render() {
    const { categories, id, toast, add, show, isUpdate, name } = this.state;
    let no = 1;
    return (
      <div className="wrapper">
        <Navibar />
        <SideBar />
        <div className="content-wrapper">
          <div className="container-fluid">
            {toast && this.showMessage()}
            <Card>
              <Card.Header>Data Categories</Card.Header>
              <Card.Title>
                <Button
                  onClick={this.showModalAdd}
                  variant="primary"
                  style={{ margin: "5px 20px" }}
                >
                  <i className="fas fa-plus"></i>
                  Tambah Category
                </Button>
              </Card.Title>

              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((data, i) => (
                      <tr key={i.toString()}>
                        <td>{no++}</td>
                        <td>{data.id}k</td>
                        <td>{data.name}</td>
                        <td colSpan={2}>
                          <td>
                            <Button
                              onClick={() => {
                                this.showModal();
                                this.setState({
                                  id: data.id
                                });
                              }}
                              variant="danger"
                            >
                              <i className="fas fa-trash"></i>
                              Hapus
                            </Button>
                          </td>
                          <td>
                            <Button
                              onClick={() => {
                                this.handleUpdate(data.name, data.id);
                                this.showModalAdd();
                              }}
                              variant="success"
                            >
                              <i className="fas fa-edit"></i>
                              Edit
                            </Button>
                          </td>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        </div>
        <Modal show={show} onHide={this.showModal}>
          <Modal.Header closeButton onHide={this.showModal}>
            <Modal.Title>Perhatian</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>yakin menghapus data ini?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.showModal}>
              Batal
            </Button>
            <Button
              onClick={() => {
                this.delCategory(id);
                this.showModal();
              }}
              variant="danger"
            >
              Ya
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={add} onHide={this.showModalAdd}>
          <Modal.Header closeButton onHide={this.showModalAdd}>
            <Modal.Title>{isUpdate ? "Update" : "Tambah"} Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <div>
                <input
                  autoFocus
                  onChange={event => this.handleForm(event)}
                  placeholder="Masukan Name Category"
                  className="form-control"
                  defaultValue={name}
                  name="name"
                ></input>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.showModalAdd}>
              Batal
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.addCategory();
                this.showModalAdd();
              }}
            >
              {isUpdate ? "Update" : "Simpan"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default index;
