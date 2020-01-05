import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import Axios from "axios";
const linkBase = "http://localhost:5000/company/";

class ModalUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      location: "",
      logo: null,
      logoName: "",
      isLoading: false
    };
  }

  handleFormModal = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleLogo = event => {
    event.preventDefault();
    let name = event.target.name;
    this.setState({
      logo: event.target.files[0],
      logoName: URL.createObjectURL(event.target.files[0])
    });
  };

  updateData = () => {
    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("location", this.state.location);
    formData.append("description", this.state.description);
    formData.append("logo", this.state.logo);
    Axios({
      url: linkBase + this.props.idComp,
      data: formData,
      method: "patch",
      headers: {
        "content-type": "multipart/form-data"
      }
    })
      .then(res => {
        console.log(res);
        this.props.reGet();
        // this.clear();
        // console.log("name", this.state.logoName);
      })
      .catch(err => {
        console.log(err);
      });
  };

  clear = () => {
    this.setState({
      name: "",
      description: "",
      location: "",
      logo: null,
      isLoading: false,
      logoName: ""
    });
  };

  componentDidMount() {
    console.log(this.props.data);
    this.setState({
      name: this.props.data.name,
      logoName: this.props.data.logo,
      description: this.props.data.description,
      location: this.props.data.location
    });
  }

  render() {
    return (
      <div>
        {/* Modal Update*/}
        <div className="form-group">
          <div
            className="modal fade"
            id={this.props.id}
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-md" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Update Data
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
                          defaultValue={this.state.name}
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
                              onChange={event => this.handleLogo(event)}
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
                      this.updateData(event);
                    }}
                    type="button"
                    data-dismiss="modal"
                    class="btn btn-primary"
                  >
                    Update
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

export default ModalUpdate;
