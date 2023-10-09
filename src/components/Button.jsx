import React from 'react';
import HistoryBoard from './HistoryBoard';

const Button = ({text, className, onClick }) =>{

    return (
        <button
        className={className}
        onClick={onClick}>
            {text}
        </button>
)
}
export default Button;