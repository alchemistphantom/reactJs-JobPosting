import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class ModalMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show
    };
  }
  handleClose = () => {
    this.setState({
      show: false
    });
  };
  render() {
    const { show } = this.props;
    return (
      <>
        <Modal centered show={show} onHide={this.handleClose} animation={true}>
          <Modal.Header>
            <Modal.Title>Perhatian</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.message}</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.props.cancel();
              }}
            >
              Batal
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                this.props.goLogout(false);
              }}
            >
              {this.props.btnPositive}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default ModalMessage;
