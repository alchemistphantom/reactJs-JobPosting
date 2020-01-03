import React, { useState } from "react";

const DefaultModal = props => {
  return (
    <div>
      <button
        type="button"
        className={props.class}
        data-toggle="modal"
        data-target={"#" + props.id}
      >
        <i className={props.icon}></i>
        {props.text}
      </button>
      <div className="modal fade" id={props.id}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{props.title}</h4>
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
              <p>{props.content}</p>
            </div>
            <div className="modal-footer ">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                data-dismiss="modal"
                className="btn btn-danger"
                onClick={props.onClick}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultModal;
