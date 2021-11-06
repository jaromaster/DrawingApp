import './App.css';
import React, { useState } from 'react'
import DrawingArea from './Components/DrawingArea';
import Tools from "./Components/Tools";


function App() {
  const [penColor, setPenColor] = useState("#000000");
  const [penWidth, setPenWidth] = useState(5);
  const [clear, setClear] = useState(false);
  const [erase, setErase] = useState(false);
  const [drawCircle, setDrawCircle] = useState(false);
  const [drawRect, setDrawRect] = useState(false);
  const [drawLine, setDrawLine] = useState(false);
  const [saveToImg, setSaveToImg] = useState(false);
  const [alpha, setAlpha] = useState(255);


  // set all drawing modes (circle, rect, line) to false
  const resetDrawingMode = () => {
    setDrawCircle(false);
    setDrawRect(false);
    setDrawLine(false);
  }

  // update pen color
  const changePenColor = (e) => {
    setPenColor(e.target.value); // hex string
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
    resetDrawingMode();
    setErase(!erase);
  }

  // toggle circle drawing
  const changeDrawCircle = (e) => {
    resetDrawingMode();
    setDrawCircle(!drawCircle);
  }

  // toggle rect drawing
  const changeDrawRect = (e) => {
    resetDrawingMode();
    setDrawRect(!drawRect);
  }

  // toggle line drawing
  const changeDrawLine = (e) => {
    resetDrawingMode();
    setDrawLine(!drawLine);
  }

  // toggle save file
  const changeSaveToImg = (e) => {
    setSaveToImg(true);
    setTimeout(()=> setSaveToImg(false), 10); // wait for setSaveToImg to take effect
  }

  // update alpha value
  const changeAlpha = (e) => {
    setAlpha(parseInt(e.target.value));
  }


  return (
    <div className="App">
      <h1>Drawing App</h1>

      <Tools changePenColor={changePenColor} clearDrawingArea={clearDrawingArea} changePenWidth={changePenWidth} changeErase={changeErase} erase={erase}
      changeDrawCircle={changeDrawCircle} drawCircle={drawCircle} changeDrawRect={changeDrawRect} drawRect={drawRect}
      changeDrawLine={changeDrawLine} drawLine={drawLine} changeSaveToImg={changeSaveToImg} changeAlpha={changeAlpha}/>
      <DrawingArea penColor={penColor} clear={clear} penWidth={penWidth} erase={erase} drawCircle={drawCircle} drawRect={drawRect} drawLine={drawLine} saveToImg={saveToImg} alpha={alpha}/>
    </div>
  );
}

export default App;
