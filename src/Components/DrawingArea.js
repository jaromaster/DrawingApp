import React, { useState } from 'react'
import Sketch from 'react-p5';
import "./DrawingArea.css";

const DrawingArea = (props) => {

    // let [penColor, setPenColor] = useState(props.penColor);
    let penColor = props.penColor;
    let clear = props.clear;
    let penWidth = 5;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const setup = (p5, canvasParentRef) => {
        const height = document.getElementById("drawingArea").offsetHeight;
        const width = document.getElementById("drawingArea").offsetWidth;
        p5.createCanvas(width, height).parent(canvasParentRef);
    }

    const draw = (p5) => {
        let mouseX = p5.mouseX;
        let mouseY = p5.mouseY;

        if (clear) {
            p5.clear();
        }

        if (p5.mouseIsPressed){
            p5.stroke(penColor);
            p5.strokeWeight(penWidth);
            p5.line(mouseX, mouseY, prevMouseX, prevMouseY);
        }
        prevMouseX = p5.mouseX;
        prevMouseY = p5.mouseY;
    }



    return (
        <div id="drawingArea">
            <Sketch setup={setup} draw={draw}/>
        </div>
    )
}   

export default DrawingArea;