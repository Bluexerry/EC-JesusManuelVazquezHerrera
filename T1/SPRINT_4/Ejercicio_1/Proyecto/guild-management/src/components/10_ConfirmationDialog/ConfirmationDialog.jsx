// ConfirmationDialog.jsx

import React from "react";
import "./ConfirmationDialog.css";

const ConfirmationDialog = ({ isOpen, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="confirmation-dialog">
            <div className="confirmation-dialog-content">
                <p>{message}</p>
                <div className="confirmation-dialog-actions">
                    <button onClick={onConfirm} className="confirm-button">Confirm</button>
                    <button onClick={onCancel} className="cancel-button">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;