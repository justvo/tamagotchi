export function playFunction(characteristics, changeCharacteristics, HistoryBoard){

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
export function washFunction(characteristics, changeCharacteristics, HistoryBoard){
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
export function feedFunction(characteristics, changeCharacteristics, HistoryBoard){
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
export function sleepFunction(characteristics, changeCharacteristics, HistoryBoard){
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
export function healFunction(characteristics, changeCharacteristics, HistoryBoard){
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

