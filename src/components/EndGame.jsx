import React from "react";
import './style/EndGame.css'

const EndGame = ({ visible, onClickRestart, onClickFinish }) => {


    if (!visible) return null;

    return (
        <div className="alert">
            <div className="alert-content">
                <h2 className="alert-title">You lost</h2>
                <svg className="alert-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="60"
                    viewBox="0 0 100 100"
                >
                    <circle cx="35" cy="40" r="5" fill="#000" />
                    <circle cx="65" cy="40" r="5" fill="#000" />
                    
                    <path
                        d="M40 60 Q50 45 60 60"
                        stroke="#000"
                        stroke-width="3"
                        fill="none"
                    />
                </svg>


                <div className="alert-buttons">
                    <button className="restart" onClick={onClickRestart}>Restart</button>
                    <button className="finish-game" onClick={onClickFinish} >Finish</button>
                </div>
            </div>

        </div>
    )
}
export default EndGame;