import React from "react";
import Button from "./Button";


const Welcome =({visible, changesetwelcomePanelShow, changesetnamedPanelShow})=>{
    if (!visible) return null;
    
    const start = ()=>{
        changesetwelcomePanelShow(false); 
        changesetnamedPanelShow(true);
        localStorage.removeItem('localName');
        localStorage.removeItem('localHistory');
        localStorage.removeItem('localCharacteristics');

    }


    return(
        <div className="welcome">
            <span>Do you want to play?</span>
            <Button className="welcome-yes" onClick={start} text="Start"/>
            <Button className="welcome-yes-too" onClick={start} text="Start too but other color"/>
        </div>
    )


}
export default Welcome;