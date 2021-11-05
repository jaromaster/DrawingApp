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
    let penWidth = props.penWidth;
    let prevMouseX = 0;
    let prevMouseY = 0;

    let dragStartPos = [0,0]; // where user starts dragging
    let dragMaxEndPos = [0,0]; // max distance between start and current drag position
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

    const draw = (p5) => {
        let mouseX = p5.mouseX;
        let mouseY = p5.mouseY;

        if (clear) {
            p5.clear();
        }

        if (p5.mouseIsPressed && checkIfPosInCanvas(mouseX, mouseY)){
            if (erase) {
                p5.erase();
            }else{
                p5.noErase();
            }

            if (drawCircle) {
                if (dragStartPos[0] === 0 && dragStartPos[1] === 0){
                    dragStartPos = [mouseX, mouseY];
                    dragMaxEndPos = [mouseX, mouseY]; // set to current pos, else it would be at 0,0 (could be really big)
                }
                dragEndPos = [mouseX, mouseY];

                const newDistance = calculateDistance(dragStartPos[0], 
                    dragStartPos[1],dragEndPos[0],dragEndPos[1]); // current distance between drag start and drag stop

                const maxDistance = calculateDistance(dragStartPos[0], 
                    dragStartPos[1],dragMaxEndPos[0],dragMaxEndPos[1]); // max distance

                // new distance greater, update max drag pos
                if (maxDistance < newDistance) {
                    dragMaxEndPos = [mouseX, mouseY];
                }
                
            }else if (drawRect){
                if (dragStartPos[0] === 0 && dragStartPos[1] === 0){
                    dragStartPos = [mouseX, mouseY];
                    dragMaxEndPos = [mouseX, mouseY]; // set to current pos, else it would be at 0,0 (could be really big)
                }
                dragEndPos = [mouseX, mouseY];

                const newDistance = calculateDistance(dragStartPos[0], 
                    dragStartPos[1],dragEndPos[0],dragEndPos[1]); // current distance between drag start and drag stop

                const maxDistance = calculateDistance(dragStartPos[0], 
                    dragStartPos[1],dragMaxEndPos[0],dragMaxEndPos[1]); // max distance

                // new distance greater, update max drag pos
                if (maxDistance < newDistance) {
                    dragMaxEndPos = [mouseX, mouseY];
                }

            }else{
                p5.stroke(penColor);
                p5.strokeWeight(penWidth);
                p5.line(mouseX, mouseY, prevMouseX, prevMouseY);
            }
        }

        // if player stopped dragging in circle mode, draw circle
        if (drawCircle && !p5.mouseIsPressed && dragEndPos[0] !== 0 && dragEndPos[1] !== 0) {
            const x1 = dragStartPos[0];
            const y1 = dragStartPos[1];
            const x2 = dragMaxEndPos[0];
            const y2 = dragMaxEndPos[1];

            const radius = calculateDistance(x1,y1,x2,y2) // distance between starting position, ending position

            // draw circle
            p5.stroke(penColor);
            p5.fill(penColor);
            p5.ellipse((x1+x2)/2, (y1+y2)/2, radius, radius); // draw circle 
            dragStartPos = [0, 0]; // reset drag start position
            dragEndPos = [0, 0]; // reset drag end position
            dragMaxEndPos = [0, 0]; // reset drag max end position
        // if player stopped dragging in rect mode, draw rect
        } else if (drawRect && !p5.mouseIsPressed && dragEndPos[0] !== 0 && dragEndPos[1] !== 0){
            const x1 = dragStartPos[0];
            const y1 = dragStartPos[1];
            const x2 = dragMaxEndPos[0];
            const y2 = dragMaxEndPos[1];

            const radius = calculateDistance(x1,y1,x2,y2) // distance between starting position, ending position

            // draw circle
            p5.stroke(penColor);
            p5.fill(penColor);
            p5.rect(x1, y1, x2-x1, y2-y1); // draw circle 
            dragStartPos = [0, 0]; // reset drag start position
            dragEndPos = [0, 0]; // reset drag end position
            dragMaxEndPos = [0, 0]; // reset drag max end position
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