import React from "react";
import Button from "./Button";

const EndGame = ({ visible, onClickRestart , onClickFinish}) =>{

    
    if (!visible) return null;

    return (
        <div className="alert">
            <div className="alert-content">
                <h2 className="alert-title">You lost</h2>
                <Button className="restart" onClick={onClickRestart} text="Restart"/> 
                <Button className="finish-game" onClick={onClickFinish} text="Finish"/> 
            </div>

        </div>
    )
}
export default EndGame;