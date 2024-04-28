import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const DeleteCategory = ({ onClose, onConfirmDelete }) => {
    return (
        <div className="Overlay">
            <div className="container">
                <div className="row Center">
                    <div className="col-lg-5 col-md-7 col-sm-9 col-10 card OrderDetailsCard">
                        <div className="CloseDetailsItem" onClick={onClose}>
                            <FontAwesomeIcon icon={faClose}/>
                        </div>
                        <div className="col-lg-9 DeleteLocationTitle">
                            <h4>All products in this category will be removed sure?</h4>
                        </div>
                        <div className="col-lg-12 ConfirmDeleteBtns">
                            <div className="col-lg-4 Center">
                                <button className="btn btn-warning col-12 LoginBtn" onClick={onClose}>
                                    <span className="Login">No</span>
                                </button>
                            </div>
                            <div className="col-lg-4 Center">
                                <button className="btn btn-warning col-12 LoginBtn" onClick={onConfirmDelete}>
                                    <span className="Login">Yes</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteCategory;
