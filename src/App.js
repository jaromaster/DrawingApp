import './App.css';
import React, { useState } from 'react'
import DrawingArea from './Components/DrawingArea';
import Tools from "./Components/Tools";


function App() {
  const [penColor, setPenColor] = useState("black");
  const [penWidth, setPenWidth] = useState(5);
  const [clear, setClear] = useState(false);
  const [erase, setErase] = useState(false);
  const [drawCircle, setDrawCircle] = useState(false);
  const [drawRect, setDrawRect] = useState(false);
  const [drawLine, setDrawLine] = useState(false);
  const [saveToImg, setSaveToImg] = useState(false);

  // update pen color
  const changePenColor = (e) => {
    setPenColor(e.target.value);
  }

  // update pen width
  const changePenWidth = (e) => {
    setPenWidth(parseInt(e.target.value));
  }

  // clear canvas
  const clearDrawingArea = (e) => {
    setClear(true);
    setTimeout(()=>setClear(false), 10); // wait for setClear to take effect
  }

  // toggle erase mode
  const changeErase = (e) => {
    setErase(!erase);
  }

  // toggle circle drawing
  const changeDrawCircle = (e) => {
    setDrawCircle(!drawCircle);
  }

  // toggle rect drawing
  const changeDrawRect = (e) => {
    setDrawRect(!drawRect);
  }

  // toggle line drawing
  const changeDrawLine = (e) => {
    setDrawLine(!drawLine);
  }

  // toggle save file
  const changeSaveToImg = (e) => {
    setSaveToImg(true);
    setTimeout(()=> setSaveToImg(false), 10); // wait for setSaveToImg to take effect
  }


  return (
    <div className="App">
      <h1>Drawing App</h1>

      <Tools changePenColor={changePenColor} clearDrawingArea={clearDrawingArea} changePenWidth={changePenWidth} changeErase={changeErase} erase={erase}
      changeDrawCircle={changeDrawCircle} drawCircle={drawCircle} changeDrawRect={changeDrawRect} drawRect={drawRect}
      changeDrawLine={changeDrawLine} drawLine={drawLine} changeSaveToImg={changeSaveToImg}/>
      <DrawingArea penColor={penColor} clear={clear} penWidth={penWidth} erase={erase} drawCircle={drawCircle} drawRect={drawRect} drawLine={drawLine} saveToImg={saveToImg}/>
    </div>
  );
}

export default App;
