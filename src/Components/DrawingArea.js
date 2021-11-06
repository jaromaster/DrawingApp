import React from 'react'
import Sketch from 'react-p5';
import "./DrawingArea.css";

// DrawingArea uses Sketch to draw to canvas
const DrawingArea = (props) => {
    let penColor = props.penColor;
    let clear = props.clear;
    let erase = props.erase;
    let drawCircle = props.drawCircle;
    let drawRect = props.drawRect;
    let drawLine = props.drawLine;
    let penWidth = props.penWidth;
    let saveToImg = props.saveToImg;
    let prevMouseX = 0;
    let prevMouseY = 0;

    let dragStartPos = [0,0]; // where user starts dragging
    let dragEndPos = [0,0]; // last position drag

    const setup = (p5, canvasParentRef) => {
        const height = document.getElementById("drawingArea").offsetHeight;
        const width = document.getElementById("drawingArea").offsetWidth;
        p5.createCanvas(width, height).parent(canvasParentRef);
    }

    const checkIfPosInCanvas = (x, y) => {
        const height = document.getElementById("drawingArea").offsetHeight;
        const width = document.getElementById("drawingArea").offsetWidth;
        if (x <= width && y <= height && x >= 0 && y >= 0){
            return true;
        }
        return false;
    }

    // calculate distance between two points
    const calculateDistance = (x1,y1,x2,y2) => {
        return Math.sqrt(Math.pow(Math.abs(x1-x2),2) + Math.pow(Math.abs(y1-y2),2))
    }

    // drawing function
    const draw = (p5) => {
        let mouseX = p5.mouseX;
        let mouseY = p5.mouseY;

        if (clear) {
            p5.clear();
            clear = false;
        } else if (saveToImg) {
            p5.save("image.png");
            saveToImg = false;
        }


        // if mouse pressed and in canvas
        // check if mode (erase, circle, rect, line) activated
        if (p5.mouseIsPressed && checkIfPosInCanvas(mouseX, mouseY)){
            if (erase) {
                p5.erase();
            }else{
                p5.noErase();
            }
            // dragging in [circle, rect, line] mode
            if (drawCircle || drawRect || drawLine) {
                if (dragStartPos[0] === 0 && dragStartPos[1] === 0){
                    dragStartPos = [mouseX, mouseY];
                }
                dragEndPos = [mouseX, mouseY];
            // standard drawing
            }else{
                p5.stroke(penColor);
                p5.strokeWeight(penWidth);
                p5.line(mouseX, mouseY, prevMouseX, prevMouseY);
            }
        }

        // player stopped dragging (mouse not pressed and dragEndPos not default value)
        if (!p5.mouseIsPressed && dragEndPos[0] !== 0 && dragEndPos[1] !== 0) {
            // x1, y1 = starting coordinate of drag
            const x1 = dragStartPos[0];
            const y1 = dragStartPos[1];
            // x2, y2 = last coordinate of drag
            const x2 = dragEndPos[0];
            const y2 = dragEndPos[1];

            // if player stopped dragging in circle mode, draw circle
            if (drawCircle) {
                const radius = calculateDistance(x1,y1,x2,y2) // distance between starting position, ending position

                // draw circle
                p5.stroke(penColor);
                p5.fill(penColor);
                p5.circle((x1+x2)/2, (y1+y2)/2, radius); // draw circle 
                dragStartPos = [0, 0]; // reset drag start position
                dragEndPos = [0, 0]; // reset drag end position

            // if player stopped dragging in rect mode, draw rect
            } else if (drawRect){

                // draw rectangle
                p5.stroke(penColor);
                p5.fill(penColor);
                p5.rect(x1, y1, x2-x1, y2-y1); // draw rectangle
                dragStartPos = [0, 0]; // reset drag start position
                dragEndPos = [0, 0]; // reset drag end position

            // if player stopped dragging in line mode, draw line
            } else if (drawLine) {

                // draw line
                p5.stroke(penColor);
                p5.strokeWeight(penWidth);
                p5.line(x1, y1, x2, y2) // draw line
                dragStartPos = [0, 0]; // reset drag start position
                dragEndPos = [0, 0]; // reset drag end position
            }
        }

        // update previous mouse position
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