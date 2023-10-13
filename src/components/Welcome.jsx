import React from "react";
import "./style/Welcome.css"


const Welcome = ({ visible, changesetwelcomePanelShow, changesetnamedPanelShow }) => {
    if (!visible) return null;

    const start = () => {
        changesetwelcomePanelShow(false);
        changesetnamedPanelShow(true);
        localStorage.removeItem('localName');
        localStorage.removeItem('localHistory');
        localStorage.removeItem('localCharacteristics');

    }


    return (
        <div className="welcome">
            <div className="welcome-container">
                <span className="welcome-title">Do you want to play?</span>
                <div className="welcome-buttons">
                    <button className="welcome-yes" onClick={start} >Start</button>
                    <button className="welcome-yes-too" onClick={start} >Start too but other color</button>
                </div>
            </div>
        </div>
    )


}
export default Welcome;