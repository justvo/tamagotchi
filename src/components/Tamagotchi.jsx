import React, { useState, useEffect } from "react";

function Tamagotchi() {

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
            }
        }, 10);

        return () => {
            clearInterval(reduceСharacteristics);
            clearInterval(checkCharacteristics);
        };
    }, [characteristics]);

    const play = () => {
        if (characteristics.happiness >= 85) {
            changeCharacteristics((prevChar) => ({
                ...prevChar,
                "vigor": prevChar.vigor - 20,
                "purity": prevChar.purity - 20
            }))
        } else {
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
                "health": prevChar.health - 20,
                "purity": prevChar.purity - 20
            }))
        } else {
            changeCharacteristics((prevChar) => ({
                ...prevChar,
                "satiety ": prevChar.satiety + 20,
                "health": prevChar.health + 15,
                "purity": prevChar.purity - 5
            }))
        }
    }
    const heal = () => {
        if (characteristics.satiety >= 85) {
            changeCharacteristics((prevChar) => ({
                ...prevChar,
                "health": prevChar.health - 20,
                "happiness": prevChar.happiness - 20
            }))
        } else {
            changeCharacteristics((prevChar) => ({
                ...prevChar,
                "health": prevChar.health + 20,
                "satiety ": prevChar.satiety + 5,
            }))
        }
    }
    const wash = () => {
        if (characteristics.satiety >= 85) {
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
                "satiety ": prevChar.satiety + 5,
            }))
        }
    }


    return (
        <div className="tamagotchi" >
            <div className="characteristics" >
                <ul >
                    {
                        Object.entries(characteristics).map(([k, val]) => (
                            <li className="characteristics-item" key={k}>
                                {k}-{val}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="buttons">
                    <button className="buttons-item" onClick={play}>Play</button>
                    <button className="buttons-item" onClick={feed}>Feed</button>
                    <button className="buttons-item" onClick={wash}>Clean</button>
                    <button className="buttons-item" onClick={heal}>Heal</button>

            </div>
        </div>
    )


}

export default Tamagotchi;