import React from 'react'
import "./Tools.css";

// Tools contains input fields like buttons and color inputs
// handles color changes, line width changes ...
const Tools = (props) => {
    const minPenWidth = 1;
    const maxPenWidth = 30;

    return (
        <div id="tools">
            <input type="color" onChange={props.changePenColor} title="change pen color"></input>
            <input type="number" onChange={props.changePenWidth} min={minPenWidth} max={maxPenWidth} defaultValue={5} title="change pen width"></input>
            <button onClick={props.clearDrawingArea} title="clear screen">CLEAR</button>
            <button onClick={props.changeErase} title="erase mode">{props.erase ? "ERASE (ON)" : "ERASE"}</button> {/* toggle erase mode*/}
            <button id="circleBtn" onClick={props.changeDrawCircle} title="drag to draw circle">{props.drawCircle ? "CIRCLE (ON)" : "CIRCLE"}</button> {/* toggle circle mode*/}
            <button id="rectBtn" onClick={props.changeDrawRect} title="drag to draw rectangle">{props.drawRect ? "RECT (ON)" : "RECT"}</button> {/* toggle rectangle mode*/}
            <button id="lineBtn" onClick={props.changeDrawLine} title="drag to draw line">{props.drawLine ? "LINE (ON)" : "LINE"}</button> {/* toggle line mode*/}
            <button id="saveBtn" onClick={props.changeSaveToImg} title="save canvas as image">SAVE</button> {/* save as image (PNG) */}
        </div>
    )
}

export default Tools;