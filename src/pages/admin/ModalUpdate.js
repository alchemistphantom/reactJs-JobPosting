import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalUpdate = props => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(!show);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
              <label htmlFor="inputDescription">Company Description</label>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalUpdate;
