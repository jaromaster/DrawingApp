import './App.css';
import React, { useState } from 'react'
import DrawingArea from './Components/DrawingArea';
import Tools from "./Components/Tools";


function App() {
  const [penColor, setPenColor] = useState("black");
  const [clear, setClear] = useState(false);

  const changePenColor = (e) => {
    setPenColor(e.target.value);
  }

  const clearDrawingArea = (e) => {
    setClear(true);
    setTimeout(()=>setClear(false), 1); // wait for setClear to take effect
  }


  return (
    <div className="App">
      <h1>Drawing App</h1>

      <Tools changePenColor={changePenColor} clearDrawingArea={clearDrawingArea}/>
      <DrawingArea penColor={penColor} clear={clear}/>
    </div>
  );
}

export default App;
