import React, { useState } from "react";


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
                    className={className}
                    type='text'
                    value={childNameValue}
                    onChange={(e) => setChildNameValue(e.target.value)}
                    placeholder="Stepan or Oleg?))"
                />
                <button onClick={onClose}>Close</button>
                <button onClick={handleSaveClick}>Save</button>
            </div>
        </div>
    );
};

export default RenameAlert;
