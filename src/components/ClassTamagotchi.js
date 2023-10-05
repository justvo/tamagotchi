class Tamagotchi{
    constructor (name){
        this.name = name;
        this.characteristics = {
            "helth" : 100,
            "desire" : "nothing",
            "happiness" : 100,
            "satiety" : 100,
            "vigor" : 100,
            "purity" : 100 
        }
    }
}

const character = new Tamagotchi("my Tamagotchi");
export default character;