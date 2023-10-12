

export function startTimers(pause, characteristics, changeCharacteristics, setShowEndGamePanel) {
    let reduceCharacteristicsInterval;
    let checkCharacteristicsInterval;

    const stopTimers = () => {
        clearInterval(reduceCharacteristicsInterval);
        clearInterval(checkCharacteristicsInterval);
    };

    const startTimers = () => {
        reduceCharacteristicsInterval = setInterval(() => {
            changeCharacteristics((prevChar) => ({
                "health": prevChar.health - 1,
                "happiness": prevChar.happiness - 1,
                "satiety": prevChar.satiety - 1,
                "vigor": prevChar.vigor - 1,
                "purity": prevChar.purity - 1,
            }));
            localStorage.setItem('localCharacteristics', JSON.stringify(characteristics));
            console.log('timer');
        }, 2000);

        checkCharacteristicsInterval = setInterval(() => {
            for (const k in characteristics) {
                if (characteristics[k] <= 0) {
                    setShowEndGamePanel(true);
                    characteristics[k] = 0;
                    changeCharacteristics((prevChar) => ({
                        ...prevChar,
                    }));
                    stopTimers();
                }
                if (characteristics[k] > 100) {
                    characteristics[k] = 100;
                    changeCharacteristics((prevChar) => ({
                        ...prevChar,
                    }));
                }
            }
        }, 10);
    };

    if (!pause) {
        startTimers();
    } else {
        stopTimers();
    }

    return () => {
        stopTimers();
    };
}
