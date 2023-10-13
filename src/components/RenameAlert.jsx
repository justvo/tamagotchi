import React, { useState } from "react";
import './style/RenameAlert.css'

const RenameAlert = ({ className, visible, onClose, setNameValue }) => {
    const [childNameValue, setChildNameValue] = useState('');
    // const [nameValue, setNewNameValue] = useState('');

    if (!visible) return null;

    const handleSaveClick = () => {
        // change name after press "Save"
        setNameValue(childNameValue);
        setChildNameValue('');
    };

    return (
        <div className="alert">
            <div className="alert-content">
                <h2 className="alert-title">Input new name</h2>
                <input
                    className="alert-input"
                    type='text'
                    value={childNameValue}
                    onChange={(e) => setChildNameValue(e.target.value)}
                    placeholder="Stepan or Oleg?))"
                />
                <div className="alert-buttons">
                <button className="alert-button" onClick={onClose}>Close</button>
                <button className="alert-button" onClick={handleSaveClick}>Save</button>
                </div>
            
            </div>
        </div>
    );
};

export default RenameAlert;
