import React, { useState } from "react";

const RenameAlert = ({ className, visible, onClose, setNameValue }) => {
    const [childNameValue, setChildNameValue] = useState('');
    const [nameValue, setNewNameValue] = useState('');

    if (!visible) return null;

    const handleSaveClick = () => {
        // Змінюємо ім'я після натискання кнопки "Save"
        setNameValue(childNameValue);
        setChildNameValue('');


        // Закриваємо компонент або виконуємо інші дії, які вам потрібні
        onClose();
    };

    return (
        <div className="rename">
            <div className="rename-content">
                <h2 className="rename-title">Input new name</h2>
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
