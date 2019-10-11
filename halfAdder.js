class HalfAdder {
    constructor() {
        this.width = 50;
        this.height = 100;
        this.xPosition = width/2 - this.width/2;
        this.yPosition = height/2 - this.height/2;
        this.activeInputs = true;
        this.isClickable = false;
        this.isInputtable = true;
        this.isOutputtable = true;
        this.isClock = false;
        this.inputs = [];
        this.maxInputs = 2;
        this.hasMultipleOutputs = true;
        this.inputIndexes = {};
        this.outputs = [false, false];
        objects.push(this);
    }

    setPosition(posX, posY) {
        this.xPosition = posX - this.width/2;
        this.yPosition = posY - this.height/2;
    }

    show() {
        fill(0);
        stroke(255);
        rect(this.xPosition, this.yPosition, this.width, this.height);
        fill(255);
        textSize(16);
        text('A',  this.xPosition + 4,  this.yPosition + 38);
        text('B',  this.xPosition + 4,  this.yPosition + 72);
        text('S',  this.xPosition + 36, this.yPosition + 38);
        text('C',  this.xPosition + 36, this.yPosition + 72);
    }

    mouseInside() {
        if(mouseX < this.xPosition || mouseX > this.xPosition + this.width)  return false;
        if(mouseY < this.yPosition || mouseY > this.yPosition + this.height) return false;
        return true;
    }

    setInputs(object) {
        if(this.inputs.indexOf(object) >= 0) {
            this.inputs.splice(this.inputs.indexOf(object),1);
        } else {
            if(this.inputs.length < this.maxInputs) {
                if(object.hasMultipleOutputs) {
                    let inputIndex = prompt("Enter the input index: ");
                    if(inputIndex >= object.outputs.length) {
                        alert("Input out of range");
                        return;
                    }
                    this.inputIndexes[object] = inputIndex;
                }
                this.inputs.push(object);
            }
        }
    }

    getActiveOfInput(i) {
        let obj = this.inputs[i];
        let isActive = null;
        if(obj.hasMultipleOutputs) {
            isActive = obj.outputs[this.inputIndexes[obj]];
        } else {
            isActive = obj.active;
        }
        return isActive;
    }

    getActiveOfInputObject(obj) {
        let isActive = null;
        if(obj.hasMultipleOutputs) {
            isActive = obj.outputs[this.inputIndexes[obj]];
        } else {
            isActive = obj.active;
        }
        return isActive;
    }

    setActive() {
        let count = 0;
        for(let i = 0; i < this.inputs.length; i++) {
            if(this.getActiveOfInput(i)) {
                count++;
            }
        }
        switch(count) {
            case 1:  this.outputs = [true, false];
            break;
            case 2:  this.outputs = [false, true];
            break;
            default: this.outputs = [false, false];
        }
    }
}

function createHalfAdder() {
    var h = new HalfAdder();
}