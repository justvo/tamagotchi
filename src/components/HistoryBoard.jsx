import React, { useState } from 'react';

const HistoryBoard = () => {
    const [history, setHistory] = useState(() => 
    {
        const localHistory = localStorage.getItem('localHistory');
        return localHistory ? JSON.parse(localHistory) : [];
    }
    );

    // Зробіть функцію addToHistory статичною
    HistoryBoard.addToHistory = (message) => {
        setHistory((prevHistory) => {
            if(prevHistory.length> 15 ){
                prevHistory.length = prevHistory.length-1; 
            }
            const newHistory = [message,...prevHistory ];
            localStorage.setItem('localHistory', JSON.stringify(newHistory));
            return newHistory;
        });
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
