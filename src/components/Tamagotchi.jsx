import React, { useState, useEffect } from "react";
import RenameAlert from "./RenameAlert";
import HistoryBoard from "./HistoryBoard";
import EndGame from "./EndGame";
import { playFunction, feedFunction, healFunction, sleepFunction, washFunction } from "./ChangeCharFunc";
import { startTimers } from "./TimerFunc";
import './style/Tamagotchi.css'


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



            <div className="characteristics" >
                <ul className="characteristics-list" >
                    {/* print characteristics */}
                    {
                        Object.entries(characteristics).map(([k, val]) => (
                            <li className="characteristics-item" key={k}>
                                <span className="character-name">{k}</span>
                                <span className="charecter-val">{val}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>


            {/* button for change characteristics */}
            <div className="tamagotchi-main-contant">

                <div className="image-and-name">
                    <h1 className="image-name">{name}</h1>
                    <div className="control-buttons">
                        <button className="visible-rename" onClick={rename}>Rename</button>
                        <button className="buttons-item" onClick={endGame} >Exit</button>
                    </div>
                    <img className="image" src={require('./img/Tamagotchi.png')} alt="My Tamagotchi" />
                </div>

                <div className="play-buttons">
                    <button className="buttons-item" onClick={heal} >Heal</button>
                    <button className="buttons-item" onClick={play} >Play</button>
                    <button className="buttons-item" onClick={feed} >Feed</button>
                    <button className="buttons-item" onClick={sleep} >Sleep</button>
                    <button className="buttons-item" onClick={wash} >Clean</button>

                </div>
            </div>
            <div>
                <HistoryBoard />
            </div>
            <div >
                <RenameAlert className="rename-alert" visible={showRename} onClose={closeRename} setNameValue={setNewName} />
                <EndGame visible={showEndGamePanel} onClickRestart={restartGame} onClickFinish={endGame} />
            </div >
        </div>
    )


}

export default Tamagotchi;