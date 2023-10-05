import logo from './logo.svg';
import { useState } from 'react';
///import Characteristics from './components/Characteristics.js';
import character from './components/ClassTamagotchi.js';
import './App.css';



function App() {
  const key = Object.key(character.characteristics);
  const val = Object.values(character.characteristics);

  return (
    <div>
      <p>{key}</p>
      <p>{val}</p>
    </div>
  );

}

export default App;
