import React, {useState} from 'react';
import './App.css';
import Tamagotchi from './components/Tamagotchi';
import Welcome from './components/Welcome';



function App() {
  const [gameOrNot, setgameOrNot] = useState(localStorage.getItem("gameOrNot")|| false);

  const changeGameState = ()=>{
    setgameOrNot(!gameOrNot);
    localStorage.setItem("gameOrNot", gameOrNot )
  }

  return (
    <div>
      <Welcome visible={!gameOrNot} changeGameState={changeGameState} />
      <Tamagotchi game={gameOrNot} changeGameState = {changeGameState} />
    </div> 
  );

}

export default App;
