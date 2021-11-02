import './App.css';
import React, { useState } from 'react'
import DrawingArea from './Components/DrawingArea';
import Tools from "./Components/Tools";


function App() {
  const [penColor, setPenColor] = useState("black");
  const [penWidth, setPenWidth] = useState(5);
  const [clear, setClear] = useState(false);
  const [erase, setErase] = useState(false);

  const changePenColor = (e) => {
    setPenColor(e.target.value);
  }

  const changePenWidth = (e) => {
    setPenWidth(parseInt(e.target.value));
  }

  const clearDrawingArea = (e) => {
    setClear(true);
    setTimeout(()=>setClear(false), 10); // wait for setClear to take effect
  }

  const changeErase = (e) => {
    setErase(!erase);
  }


  return (
    <div className="App">
      <h1>Drawing App</h1>

      <Tools changePenColor={changePenColor} clearDrawingArea={clearDrawingArea} changePenWidth={changePenWidth} changeErase={changeErase} erase={erase}/>
      <DrawingArea penColor={penColor} clear={clear} penWidth={penWidth} erase={erase}/>
    </div>
  );
}

export default App;
