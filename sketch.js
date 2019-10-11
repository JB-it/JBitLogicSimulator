var objects = [];
var connectObject = null;
var clockState = false;
var gitter;


function setup() {
    var canvas = createCanvas(windowWidth,windowHeight);
    canvas.parent("CanvasHolder");
    setInterval(refreshClocks, 100);
    gitter = document.getElementById("GitterToggleButton");
}

function draw() {
    background(0,0,100);
    if(gitter.checked){
        stroke('rgba(255,255,255,0.25)');
        for(let y = 0; y < height; y += 50) {
            line(0, y, width, y);
        }
        for(let x = 0; x < width; x += 50) {
            line(x, 0, x, height);
        }
    }
    for(let i = 0; i < objects.length; i++) {
        var obj = objects[i];
        if(obj.isInputtable) {
            showConnections(obj);
        }
    }
    for(let i = 0; i < objects.length; i++) {
        var obj = objects[i];
        if(!obj.isClickable) {
            if(objects[i].isClock) {
                objects[i].setActive(clockState);
            } else {
                obj.setActive();
            }
        }
        obj.show();
    }
    if(connectObject != null) {
        stroke(255);
        noFill();
        rect(connectObject.xPosition, connectObject.yPosition, connectObject.width, connectObject.height);
    }
}

function showConnections(renderObject) {
    noFill();
    for(let i = 0; i < renderObject.inputs.length; i++) {
        if(renderObject.inputs[i].hasMultipleOutputs) {
            let obj = renderObject.inputs[i];
            if(obj.outputs[renderObject.inputIndexes[obj]]) {
                stroke(255);
            } else {
                stroke(155);
            }
        }else {
            if(renderObject.inputs[i].active) {
                stroke(255);
            } else {
                stroke(155);
            }
        }
        let xStart, yStart, yEnd;
        if(renderObject.inputs[i].hasMultipleOutputs) {
            let inputObject = renderObject.inputs[i];
            let index = parseInt(renderObject.inputIndexes[inputObject]);
            yEnd = renderObject.yPosition + renderObject.height / (renderObject.maxInputs+1) * (i+1);
            xStart = renderObject.inputs[i].xPosition + renderObject.inputs[i].width;
            yStart = renderObject.inputs[i].yPosition + (renderObject.inputs[i].height/(renderObject.inputs[i].outputs.length+1))*(index+1);
        } else {
            yEnd = renderObject.yPosition + renderObject.height / (renderObject.maxInputs+1) * (i+1);
            xStart = renderObject.inputs[i].xPosition + renderObject.inputs[i].width;
            yStart = renderObject.inputs[i].yPosition + renderObject.inputs[i].height/2;
        }
        if(renderObject.inputs[i].xPosition + renderObject.inputs[i].width + 40 > renderObject.xPosition) {
            let halfY = (yStart - (renderObject.yPosition + renderObject.height/2)) / 2 + yEnd;
            beginShape();
            vertex(xStart, yStart);
            vertex(xStart + 20, yStart);
            vertex(xStart + 20, halfY);
            vertex(renderObject.xPosition - 20, halfY);
            vertex(renderObject.xPosition - 20, yEnd);
            vertex(renderObject.xPosition, yEnd);
            endShape(OPEN);
        } else {
            let halfX = (xStart - renderObject.xPosition) / 2 + renderObject.xPosition;
            beginShape();
            vertex(renderObject.xPosition,yEnd);
            vertex(halfX, yEnd);
            vertex(halfX, yStart);
            vertex(xStart, yStart);
            endShape(OPEN);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
    for(let i = 0; i < objects.length; i++) {
        var obj = objects[i];
        if(obj.mouseInside()) {
            if(obj.isClickable) {
                obj.toggle();
            }
            if(connectObject != null && connectObject != obj) {
                if(obj.isInputtable && connectObject.isOutputtable) {
                    obj.setInputs(connectObject);
                }
            }
            connectObject = obj;
            break;
        }
        if(i == objects.length -1) {
            connectObject = null;
        }
    }
}

function refreshClocks() {
    clockState = clockState == false;
}

function mouseDragged(event) {
    if(connectObject == null) {
        for(let i = 0; i < objects.length; i++) {
            var obj = objects[i];
            if(obj.mouseInside()) {
                connectObject = obj;
                break;
            }
            if(i == objects.length -1) {
                connectObject = null;
            }
        }
    } else {
        if(gitter.checked) {
            connectObject.setPosition(Math.floor(mouseX/50)*50 + connectObject.width/2, Math.floor(mouseY/50)*50 + connectObject.height/2);
        } else {
            connectObject.setPosition(mouseX, mouseY);
        }
    }
}

function deleteElement() {
    if(connectObject != null) {
        for(let i = 0; i < objects.length; i++) {
            if(objects[i].isInputtable && objects[i] != connectObject) {
                if(objects[i].inputs.indexOf(connectObject) >= 0) {
                    objects[i].inputs.splice(objects[i].inputs.indexOf(connectObject),1);
                }
            }
        }
        objects.splice(objects.indexOf(connectObject),1)[0];
        connectObject = null;
    }
}
