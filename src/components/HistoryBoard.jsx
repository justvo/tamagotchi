import React, { useState } from 'react';
import './style/HistoryBoard.css'

const HistoryBoard = () => {
    const [history, setHistory] = useState(() => 
    {
        const localHistory = localStorage.getItem('localHistory');
        return localHistory ? JSON.parse(localHistory) : [];
    }
    );

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
        <div className='history-board'>
            <h1 className='history-board-title'>HistoryBoard</h1>
            <div>
                <ul className='history-lists'>
                    {history.map((item, index) => (
                        <li className='history-lists-item' key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HistoryBoard;
