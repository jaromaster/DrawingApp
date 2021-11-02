import React from 'react'
import "./Tools.css";

// Tools contains input fields like buttons and color inputs
// handles color changes, line width changes ...
const Tools = (props) => {
    const minPenWidth = 1;
    const maxPenWidth = 30;

    return (
        <div id="tools">
            <input type="color" onChange={(e)=>props.changePenColor(e)} title="change pen color"></input>
            <input type="number" onChange={(e)=>props.changePenWidth(e)} min={minPenWidth} max={maxPenWidth} defaultValue={5} title="change pen width"></input>
            <button onClick={(e)=>props.clearDrawingArea(e)} title="clear screen">CLEAR</button>
            <button onClick={(e)=>props.changeErase(e)} title="erase mode screen">{props.erase ? "ERASE (ON)" : "ERASE"}</button>
        </div>
    )
}

export default Tools;