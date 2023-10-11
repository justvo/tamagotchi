import React, {useState, useEffect} from 'react';
import './App.css';
import Tamagotchi from './components/Tamagotchi';
import Welcome from './components/Welcome';
import RenameAlert from './components/RenameAlert';




function App() {
  const [welcomePanel, setWelcomePanelShow] = useState(true);
  const [namedPanelShow, setNamedPanelShow] = useState(false);
  const [gameOrNot, setGameOrNot] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Используем localStorage для установки начальных значений только после загрузки
    const welcomePanelValue = localStorage.getItem('welcomePanel');
    const namedPanelShowValue = localStorage.getItem('namedPanelShow');
    const gameOrNotValue = localStorage.getItem('gameOrNot');
    const userNameValue = localStorage.getItem('localName');

    if (welcomePanelValue !== null) {
      setWelcomePanelShow(welcomePanelValue === 'true');
    }

    if (namedPanelShowValue !== null) {
      setNamedPanelShow(namedPanelShowValue === 'true');
    }

    if (gameOrNotValue !== null) {
      setGameOrNot(gameOrNotValue === 'true');
    }

    if (userNameValue !== null) {
      setUserName(userNameValue);
    }
  }, []);
  const changeGameState =(val)=>{

    setGameOrNot(val);
    localStorage.setItem("gameOrNot", val );
  }

  const enterUserName = (v) =>{
    if(v.trim() !==""){
      setUserName(v); 
      localStorage.setItem("localName", v );
      changeGameState(true);
      changesetnamedPanelShow(false);
    }
  }


  const changesetwelcomePanelShow = (val)=>{

    setWelcomePanelShow(val);

    localStorage.setItem('welcomePanel', val );
  }

  const changesetnamedPanelShow = (val)=>{
    setNamedPanelShow(val);
    localStorage.setItem("namedPanelShow", val );
  }

  const fromNameToWelcom = ()=>{
    changesetwelcomePanelShow(true);
    changesetnamedPanelShow(false);
  }
  const fromGameToWelcom = ()=>{
    changesetwelcomePanelShow(true);
    changeGameState(false);
  }


  return (
    <div>
      <Welcome visible={welcomePanel} changesetwelcomePanelShow={changesetwelcomePanelShow} changesetnamedPanelShow={changesetnamedPanelShow} />
      <RenameAlert className="first-name-alert" visible={namedPanelShow} onClose={fromNameToWelcom} setNameValue={enterUserName} />
      <Tamagotchi  game={gameOrNot} changeGameState = {fromGameToWelcom} userName={userName} />
    </div> 
  );

}

export default App;
