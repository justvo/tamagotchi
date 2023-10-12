import React, { useState, useEffect } from "react";
import Button from "./Button";
import RenameAlert from "./RenameAlert";
import HistoryBoard from "./HistoryBoard";
import EndGame from "./EndGame";
import { playFunction, feedFunction, healFunction, sleepFunction, washFunction } from "./ChangeCharFunc";
import { startTimers} from "./TimerFunc";


function Tamagotchi({ game, changeGameState, userName }) {


    const [showRename, setShowRename] = useState(false);
    const [showEndGamePanel, setShowEndGamePanel] = useState(false);
    const [name, setName] = useState('');
    const [characteristics, changeCharacteristics] = useState(JSON.parse(localStorage.getItem('localCharacteristics')) || {
        "health": 100,
        "happiness": 100,
        "satiety": 100,
        "vigor": 100,
        "purity": 100,
    });
    const [pause, setpause] = useState(false);


    useEffect(() => {
        const changeName = () => {
            setName(localStorage.getItem('localName') || userName || '');
            //start change characteristics after named
            if (name !== '') setpause(false);
        };
        changeName();
    }, [userName, name]);



    useEffect(() => {
        return startTimers(pause, characteristics, changeCharacteristics, setShowEndGamePanel);
    }, [pause, characteristics]);



    if (!game) return null;


    // open rename panel
    const rename = () => {
        setShowRename(true);
        HistoryBoard.addToHistory("Do you want to rename me?");
        setpause(true);
    }
    // close rename panel
    const closeRename = () => {
        setShowRename(false);
        //stop change characteristics
        setpause(false);
    }
    // save new name
    const setNewName = (v) => {
        if (v.trim() !== "") {
            setName(v);
            //stop change characteristics
            setpause(false);
            HistoryBoard.addToHistory(`Now I have a new name: ${v}. Sounds great`);
            localStorage.setItem('localName', v);
            closeRename();
        }
    }

    const restartGame = () => {
        setShowEndGamePanel(false);
        setShowRename(false);
        setName(userName);
        changeCharacteristics({
            "health": 100,
            "happiness": 100,
            "satiety": 100,
            "vigor": 100,
            "purity": 100,
        })
    }

    const endGame = () => {
        restartGame();
        changeGameState();
        setpause(true);
        localStorage.removeItem('localIfNamed');
        localStorage.removeItem('localName');
        localStorage.removeItem('localHistory');
        localStorage.removeItem('localCharacteristics');
    }
    //function 
    const play = () => {
        playFunction(characteristics, changeCharacteristics, HistoryBoard);
    }

    const feed = () => {
        feedFunction(characteristics, changeCharacteristics, HistoryBoard);
    }
    const heal = () => {
        healFunction(characteristics, changeCharacteristics, HistoryBoard);
    }
    const wash = () => {
        washFunction(characteristics, changeCharacteristics, HistoryBoard);
    }
    const sleep = () => {
        sleepFunction(characteristics, changeCharacteristics, HistoryBoard);
    }




    return (
        <div className="tamagotchi" >
            {/* panel for change name or end */}
            <div className="alert-panel">
                <RenameAlert className="rename-alert" visible={showRename} onClose={closeRename} setNameValue={setNewName} />
                <EndGame visible={showEndGamePanel} onClickRestart={restartGame} onClickFinish={endGame} />
            </div>
            <h1>{name}</h1>
            <div className="characteristics" >
                <ul >
                    {/* print characteristics */}
                    {
                        Object.entries(characteristics).map(([k, val]) => (
                            <li className="characteristics-item" key={k}>
                                <span className="character-name">{k}</span>-<span className="charecter-val">{val}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="tamagotchi-img">



            </div>

            {/* button for change characteristics */}

            <div className="buttons">
                <Button className="buttons-item" onClick={play} text="Play" />
                <Button className="buttons-item" onClick={feed} text="Feed" />
                <Button className="buttons-item" onClick={wash} text="Clean" />
                <Button className="buttons-item" onClick={heal} text="Heal" />
                <Button className="buttons-item" onClick={sleep} text="Sleep" />
                <Button className="visible-rename" onClick={rename} text="Rename your Tamagotchi" />
                <Button className="buttons-item" onClick={endGame} text="exit" />
            </div>


            <div>
                <HistoryBoard />
            </div>
        </div>
    )


}

export default Tamagotchi;