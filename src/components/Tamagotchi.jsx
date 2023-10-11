import React, { useState, useEffect } from "react";
import Button from "./Button";
import RenameAlert from "./RenameAlert";
import HistoryBoard from "./HistoryBoard";
import EndGame from "./EndGame";



function Tamagotchi({ game, changeGameState, userName, pause }) {


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
    const [ifNamed, setIfNamed] = useState(localStorage.getItem('localIfNamed') || false);
    const [pause, setpause] = useState(true)


    useEffect(() => {
        const changeName = () => {
            setName(localStorage.getItem('localName') || userName||'');
            if(name!=='')setIfNamed(true); 
        };
        changeName();
    }, [userName]);



    useEffect(() => {

        if (ifNamed && pause) {
            const reduceCharacteristics = setInterval(() => {

                changeCharacteristics((prevChar) => ({
                    "health": prevChar.health - 1,
                    "happiness": prevChar.happiness - 1,
                    "satiety": prevChar.satiety - 1,
                    "vigor": prevChar.vigor - 1,
                    "purity": prevChar.purity - 1,
                }));
                localStorage.setItem('localCharacteristics', JSON.stringify(characteristics));
            }, 2000);

            const checkCharacteristics = setInterval(() => {
                for (const k in characteristics) {
                    if (characteristics[k] <= 0) {
                        setShowEndGamePanel(true);
                        characteristics[k] = 0;
                        changeCharacteristics((prevChar) => ({
                            ...prevChar,
                        }));
                        clearInterval(reduceCharacteristics);
                        clearInterval(checkCharacteristics);


                    }
                    if (characteristics[k] > 100) {
                        characteristics[k] = 100;
                        changeCharacteristics((prevChar) => ({
                            ...prevChar,
                        }));
                    }
                }
            }, 10);


            return () => {
                clearInterval(reduceCharacteristics);
                clearInterval(checkCharacteristics);
            };
        }

    }, [ifNamed, pause, characteristics]);

    if (!game) return null;




    // open rename panel
    const rename = () => {
        setShowRename(true);
        HistoryBoard.addToHistory("Do you want to rename me?");
        setpause(false);
    }
    // close rename panel
    const closeRename = () => {
        setShowRename(false);
        setpause(true);
    }
    // save new name
    const setNewName = (v) => {
        if (v.trim() !== "") {
            setName(v);
            setpause(true);
            localStorage.setItem('localIfNamed', ifNamed);
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

    const play = () => {

        if (characteristics.happiness >= 85) {
            HistoryBoard.addToHistory("I don't want to play( happiness -10)");
            changeCharacteristics((prevChar) => ({
                ...prevChar,
                "happiness": prevChar.happiness - 10,

            }))
        } else {
            HistoryBoard.addToHistory("Thanks for playing with me(happiness +20)");
            changeCharacteristics((prevChar) => ({
                ...prevChar,
                "happiness": prevChar.happiness + 20,
                "vigor": prevChar.vigor - 5,
                "purity": prevChar.purity - 5
            }))
        }
        console.log(characteristics)
    }

    const feed = () => {
        if (characteristics.satiety >= 85) {
            HistoryBoard.addToHistory("I'm not hungry (health -10)");
            changeCharacteristics((prevChar) => ({
                ...prevChar,
                "health": prevChar.health - 10,
                "purity": prevChar.purity - 10
            }))
        } else {
            HistoryBoard.addToHistory("Thank you for feeding me (satiety +20)");
            changeCharacteristics((prevChar) => ({
                ...prevChar,
                "satiety": prevChar.satiety + 20,
                "health": prevChar.health + 15,
                "purity": prevChar.purity - 5
            }))
        }
    }
    const heal = () => {
        if (characteristics.health >= 85) {
            HistoryBoard.addToHistory("Thanks for playinI'm already healthy, I don't need to be treated(health -10)");
            changeCharacteristics((prevChar) => ({
                ...prevChar,
                "health": prevChar.health - 10,
                "happiness": prevChar.happiness - 10
            }))
        } else {
            HistoryBoard.addToHistory("Thank you for the treatment, I am healthier now (health +20)");
            changeCharacteristics((prevChar) => ({
                ...prevChar,
                "health": prevChar.health + 20,
                "satiety": prevChar.satiety + 5,
            }))
        }
    }
    const wash = () => {
        if (characteristics.purity >= 85) {
            HistoryBoard.addToHistory("Can't you see that I glow with purity?(happiness -10)");
            changeCharacteristics((prevChar) => ({
                ...prevChar,
                "health": prevChar.health - 10,
                "happiness": prevChar.happiness - 10
            }))
        } else {
            HistoryBoard.addToHistory("Now I am clean, thank you (purity +20)");
            changeCharacteristics((prevChar) => ({
                ...prevChar,
                "purity": prevChar.purity + 20,
                "health": prevChar.health + 10,
                "satiety": prevChar.satiety + 5,
            }))
        }
    }
    const sleep = () => {
        if (characteristics.vigor >= 85) {
            HistoryBoard.addToHistory("it is not yet time to sleep (happiness -10)");
            changeCharacteristics((prevChar) => ({
                ...prevChar,
                "happiness": prevChar.happiness - 10
            }))
        } else {
            HistoryBoard.addToHistory("You're right, it's time for bed (vigor +20)");
            changeCharacteristics((prevChar) => ({
                ...prevChar,
                "vigor": prevChar.vigor + 20,
                "health": prevChar.health + 10,
                "satiety": prevChar.satiety + 5,
                "happiness": prevChar.happiness + 5
            }))
        }
    }

    // const localClear =()=>{
    //     localStorage.clear();
    //     restartGame();
    // }


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
                {/* <Button className="buttons-item" onClick={localClear} text="CLear locstor"/> */}
                <Button className="buttons-item" onClick={endGame} text="exit" />


            </div>

            <div>
                <HistoryBoard />
            </div>
        </div>
    )


}

export default Tamagotchi;