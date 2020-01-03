import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import Axios from "axios";
const linkBase = "http://localhost:5000/company/";

class ModalAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      location: "",
      logo: null,
      logoName: "",
      isLoading: false,
      data: {
        id: "coba",
        name: "",
        logo: "",
        location: "",
        description: ""
      }
    };
  }

  handleFormModal = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState(
      {
        [name]: value
      },
      () => {
        // console.log(this.state.name);
      }
    );
  };

  handleLogo = event => {
    event.preventDefault();
    let name = event.target.name;
    this.setState({
      [name]: event.target.files[0],
      logoName: URL.createObjectURL(event.target.files[0])
    });
  };

  onSubmit = async event => {
    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("location", this.state.location);
    formData.append("description", this.state.description);
    formData.append("logo", this.state.logo);
    // console.log(formData);
    await Axios({
      url: linkBase,
      data: formData,
      method: "post",
      headers: {
        "content-type": "multipart/form-data"
      }
    })
      .then(res => {
        // console.log(res);
        this.props.reGet();
        this.clear();
        // console.log("name", this.state.logoName);
      })
      .catch(err => {
        console.log(err);
      });
  };

  clear = () => {
    this.setState({
      name: "coba1",
      description: "",
      location: "",
      logo: null,
      isLoading: false,
      logoName: ""
    });
  };

  componentDidMount() {
    // if (this.props.coba) {
    //   this.setState(
    //     {
    //       data: this.props.coba
    //     },
    //     () => {
    //       console.log(this.state.data);
    //     }
    //   );
    // }
  }

  // componentWillReceiveProps() {
  //   this.setState({
  //     data: this.props.coba
  //   });
  // }

  render() {
    return (
      <div>
        <div className="form-group">
          {/* <button
            type="button"
            className={this.props.class}
            data-toggle="modal"
            data-target="#exampleModal"
          >
            <i className={this.props.icon} color="white"></i>
            {this.props.textButton}
          </button> */}

          {/* Modal add*/}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-md" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Tambah {this.state.data.name}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="inputName">Company Name</label>
                        <input
                          type="text"
                          required={true}
                          id="name"
                          name="name"
                          value={this.state.name}
                          className="form-control"
                          onChange={event => {
                            this.handleFormModal(event);
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputDescription">
                          Company Description
                        </label>
                        <textarea
                          id="inputDescription"
                          name="description"
                          className="form-control"
                          rows={4}
                          value={this.state.description}
                          onChange={event => {
                            this.handleFormModal(event);
                          }}
                          defaultValue={""}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputProjectLeader">Location</label>
                        <input
                          type="text"
                          required={true}
                          id="inputProjectLeader"
                          className="form-control"
                          name="location"
                          value={this.state.location}
                          onChange={event => {
                            this.handleFormModal(event);
                          }}
                        />
                      </div>
                      <div class="form-group">
                        <label for="exampleInputFile">Logo</label>
                        <div class="input-group">
                          <div class="custom-file">
                            <input
                              type="file"
                              // className="custom-file-input"
                              // id="exampleInputFile"
                              name="logo"
                              onChange={this.handleLogo}
                            />
                            <img
                              src={
                                this.state.logoName ||
                                "https://img.icons8.com/cotton/2x/stack-of-photos.png"
                              }
                              alt="logo"
                              height="100px"
                              width="100px"
                            ></img>

                            {/* <label
                              class="custom-file-label"
                              for="exampleInputFile"
                            >
                              {this.state.logoName}
                            </label> */}
                          </div>
                        </div>
                      </div>

                      {/* /.card */}
                    </div>
                  </div>
                  {/* /.content */}
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={event => {
                      this.onSubmit(event);
                    }}
                    type="button"
                    data-dismiss="modal"
                    class="btn btn-primary"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalAdd;
