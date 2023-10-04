import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState("");
  
  return (
    <div className='App'>
      <label className='lable'>Name</label>
      <input
      type = "text"
      value={name}
      onChange={(e)=>setName(e.target.value)}>
      </input>
      <p>Hi, {name}</p>
    </div>
  );

}

export default App;
