import React from 'react'
import "./Tools.css";


const Tools = (props) => {

    return (
        <div id="tools">
            <input type="color" onChange={(e)=>props.changePenColor(e)} title="change pen color"></input>
            <button onClick={(e)=>props.clearDrawingArea(e)}>CLEAR</button>
        </div>
    )
}

export default Tools;