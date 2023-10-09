import React, { useState } from 'react';

const HistoryBoard = () => {
    const [history, setHistory] = useState([]);

    // Зробіть функцію addToHistory статичною
    HistoryBoard.addToHistory = (message) => {
        setHistory([...history, message]);
    };

    return (
        <div>
            <h1>HistoryBoard</h1>
            <div>
                <ul>
                    {history.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HistoryBoard;
