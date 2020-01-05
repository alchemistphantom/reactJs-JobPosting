import React, { Component } from "react";
import axios from "axios";
import ModalAdd from "./ModalAdd";
import DefaultModal from "../../component/DefaultModal";
import SideBar from "./SideBar";
import { Alert, Spinner } from "react-bootstrap";
import ModalUpdate from "./ModalUpdate";
const linkBase = "http://localhost:5000/company/";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      more: true,
      id: "",
      isLoading: false,
      idModal: "",
      data: {
        id: "",
        name: "nama",
        logo: "",
        location: "",
        description: ""
      },
      isUpdate: false
    };
  }

  componentDidMount() {
    this.getCompanies();
  }

  getCompanies = async () => {
    this.setState({
      isLoading: true
    });
    await axios
      .get(linkBase)
      .then(res => {
        this.setState({
          companies: res.data.data,
          isLoading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  desc = data => {
    // if (this.state.more) {
    let dataa = this.state.companies.filter(item => {
      return item.id === this.state.id;
    });
    return <div>{data.description.substr(0, 100)}</div>;
  };

  moreDesc = data => {
    let dataa = this.state.companies.filter(item => {
      return item.id === this.state.id;
    });
    return (
      <div>
        {dataa[0].description.substr(99, dataa[0].description.length)}
        {/* <a
          onClick={() => {
            this.getCompanies();
            this.more(data.id);
          }}
          href="#"
        >
          {" "}
          {!this.state.more ? "less" : null}
        </a> */}
      </div>
    );
  };

  more = idCom => {
    this.setState({
      more: !this.state.more,
      id: idCom
    });
  };

  delCompany = id => {
    axios
      .delete(linkBase + id)
      .then(res => {
        this.getCompanies();
      })
      .catch(err => {
        console.log(err);
      });
  };

  NotFoundData = () => {
    if (this.state.isLoading) {
      return <Spinner animation="border" />;
    }
    if (this.state.companies.length === 0)
      return <Alert variant="danger">Data tidak ditemukan</Alert>;
  };

  handleUpdate = datas => {
    this.setState({
      data: datas,
      isUpdate: true
    });
  };

  render() {
    let no=1
    return (
      <div>
        <div className="wrapper">
          {/* Navbar */}
          <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" data-widget="pushmenu" href="#">
                  <i className="fas fa-bars" />
                </a>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <a href="index3.html" className="nav-link">
                  Home
                </a>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <a href="#" className="nav-link">
                  Contact
                </a>
              </li>
            </ul>
            {/* SEARCH FORM */}
            <form className="form-inline ml-3">
              <div className="input-group input-group-sm">
                <input
                  className="form-control form-control-navbar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div className="input-group-append">
                  <button className="btn btn-navbar" type="submit">
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </form>
          </nav>
          {/* /.navbar */}
          {/* Main Sidebar Container */}
          <SideBar />
          {/* Content Wrapper. Contains page content */}
          <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div>
              <div className="container-fluid">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Data Company</h3>
                  </div>
                  {/* <button
                      type="button"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      <i className="fas fa-plus" color="white"></i>
                      Tambah Company
                    </button> */}

                  <div className="card-body">
                    <ModalAdd
                      modalTitle="Tambah Company"
                      reGet={this.getCompanies}
                      icon="fas fa-plus"
                      textButton="Add Company"
                      class="btn btn-primary"
                    />
                    <div className="row">
                      <table
                        id="tabelCategory"
                        className="table table-bordered table-striped"
                      >
                        <thead>
                          <tr>
                            <th>No </th>
                            <th>Name</th>
                            <th>Logo</th>
                            <th>Location</th>
                            <th>Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {this.state.companies.map((data, i) => {
                            return (
                              <tr key={i.toString()}>
                                <td>{no++}</td>
                                <td>{data.name}</td>
                                <td>
                                  <img
                                    src={data.logo}
                                    alt={data.name}
                                    width="100px"
                                    height="100px"
                                  />
                                </td>
                                <td>{data.location}</td>
                                <td style={{ maxLength: 200 }}>
                                  {this.desc(data)}
                                  {data.id === this.state.id &&
                                    this.moreDesc(data)}
                                  <a
                                    onClick={() => {
                                      this.more(data.id);
                                    }}
                                    href="#"
                                  >
                                    {this.state.more &&
                                    data.id === this.state.id
                                      ? "less"
                                      : "more"}
                                  </a>
                                </td>
                                <td colSpan={2}>
                                  <span className="inline">
                                    <DefaultModal
                                      class="btn btn-danger"
                                      icon="fa fa-trash-alt"
                                      text="delete"
                                      title="Perhatian"
                                      content="yakin hapus data ini?"
                                      fafa={data.id}
                                      id={"modal-default" + data.id}
                                      onClick={() => {
                                        this.delCompany(data.id);
                                      }}
                                    />
                                    <button
                                      type="button"
                                      className="btn btn-success"
                                      data-toggle="modal"
                                      data-target={"#exampleModal" + data.id}
                                      onClick={() => {
                                        this.handleUpdate(data);
                                      }}
                                    >
                                      <i
                                        className="fa fa-edit"
                                        color="white"
                                      ></i>
                                      Edit
                                    </button>
                                  </span>{" "}
                                  <ModalUpdate
                                    modalTitle="Tambah Company"
                                    reGet={this.getCompanies}
                                    id={"exampleModal" + data.id}
                                    idComp={data.id}
                                    data={data}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    {this.NotFoundData()}
                  </div>
                  {/* <!-- /.card-body --> */}
                </div>
              </div>
              {/* /.container-fluid */}
            </div>
            {/* /.content */}
          </div>
          {/* /.content-wrapper */}
          {/* Control Sidebar */}
          <aside className="control-sidebar control-sidebar-dark">
            {/* Control sidebar content goes here */}
          </aside>
          {/* /.control-sidebar */}
          {/* Main Footer */}
          <footer className="main-footer">
            <strong>
              Copyright © 2014-2019 <a href="http://adminlte.io">AdminLTE.io</a>
              .
            </strong>
            All rights reserved.
            <div className="float-right d-none d-sm-inline-block">
              <b>Version</b> 3.0.2-pre
            </div>
          </footer>
        </div>
        {/* ./wrapper */}
      </div>
    );
  }
}

export default Home;
