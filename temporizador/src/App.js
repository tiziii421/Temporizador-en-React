import './App.css';
import React from 'react';
import Temporizar from './temporizador';


function App() {
const color = {color: 'rgb(209, 189, 7)'};
return (
<div className="App">
  <h2>Pomodoro <span style={color}>App</span></h2>
 
  <Temporizar/>
</div>
);
}


export default App;