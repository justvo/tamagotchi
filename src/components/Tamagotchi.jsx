import React, { useState, useEffect } from "react";
import Button from "./Button";
import RenameAlert from "./RenameAlert";
import HistoryBoard from "./HistoryBoard";

function Tamagotchi() {
    const [showRename, setShowRename] = useState(false)
    const [name, setName] = useState("my Tamagotchi");
    const [characteristics, changeCharacteristics] = useState({
        "health": 100,
        "happiness": 100,
        "satiety": 100,
        "vigor": 100,
        "purity": 100,
    });

    useEffect(() => {
        const reduceСharacteristics = setInterval(() => {

            changeCharacteristics((prevChar) => ({
                "health": prevChar.health - 1,
                "happiness": prevChar.happiness - 1,
                "satiety": prevChar.satiety - 1,
                "vigor": prevChar.vigor - 1,
                "purity": prevChar.purity - 1,
            }));
        }, 1000);

        const checkCharacteristics = setInterval(() => {
            for (const k in characteristics) {
                if (characteristics[k] <= 0) {

                    clearInterval(reduceСharacteristics);
                    clearInterval(checkCharacteristics);
                }
                if(characteristics[k] > 100) {
                    characteristics[k]= 100; 
                    changeCharacteristics((prevChar) => ({
                        ...prevChar,
                    }));
                }
            }
        }, 10);

        return () => {
            clearInterval(reduceСharacteristics);
            clearInterval(checkCharacteristics);
        };
    }, [characteristics]);
    const rename =()=>{
        setShowRename(true);

    }
    const closeRename =()=>{
        setShowRename(false);
    }
    const setNewName = (v)=>{
        setName(v);
    }

    const play = () => {

        if (characteristics.happiness >= 85) {
            const message = "I don't want to play( happiness -10)";
            HistoryBoard.addToHistory(message);
            changeCharacteristics((prevChar) => ({
                ...prevChar,
                "happiness": prevChar.happiness - 10,

            }))
        } else {
            const message = "Thanks for playing with me(happiness +20)";
            HistoryBoard.addToHistory(message);
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
            changeCharacteristics((prevChar) => ({
                ...prevChar,
                "health": prevChar.health - 10,
                "purity": prevChar.purity - 10
            }))
        } else {
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
            changeCharacteristics((prevChar) => ({
                ...prevChar,
                "health": prevChar.health - 10,
                "happiness": prevChar.happiness - 10
            }))
        } else {
            changeCharacteristics((prevChar) => ({
                ...prevChar,
                "health": prevChar.health + 20,
                "satiety": prevChar.satiety + 5,
            }))
        }
    }
    const wash = () => {
        if (characteristics.purity >= 85) {
            changeCharacteristics((prevChar) => ({
                ...prevChar,
                "health": prevChar.health - 10,
                "happiness": prevChar.happiness - 10
            }))
        } else {
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
            changeCharacteristics((prevChar) => ({
                ...prevChar,
                "happiness": prevChar.happiness - 10
            }))
        } else {
            changeCharacteristics((prevChar) => ({
                ...prevChar,
                "vigor": prevChar.vigor + 20,
                "health": prevChar.health + 10,
                "satiety": prevChar.satiety + 5,
                "happiness": prevChar.happiness +5
            }))
        }
    }


    return (
        <div className="tamagotchi" >
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
                    {/* button for change characteristics */}

            <div className="buttons">
                    <Button className="buttons-item" onClick={play} text ="Play"/>
                    <Button className="buttons-item" onClick={feed} text="Feed"/>
                    <Button className="buttons-item" onClick={wash} text="Clean"/>
                    <Button className="buttons-item" onClick={heal} text="Heal"/>
                    <Button className="buttons-item" onClick={sleep} text="Sleep"/>
                    <Button className="visible-rename" onClick={rename} text="Rename your Tamagotchi"/>
            </div>
            <div className="alert-panel">
                    <RenameAlert className="rename-alert" visible={showRename} onClose={closeRename} setNameValue={setNewName} />
            </div>
            <div>
                <HistoryBoard/>
            </div>
        </div>
    )


}

export default Tamagotchi;